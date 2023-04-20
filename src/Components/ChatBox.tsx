import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ChatBoxProp {
  onAddMessage: (role: string, content: string, response: string) => void;
  selectedTheme: string;
  setSelectedTheme : (themeName: string) => void;
  addTheme :(themeName : string, message ?: string, response ?: string) => void;
  themes: Theme[];
}

interface Theme {
  name: string;
  messages: Message[];
}

interface Message {
  role: string;
  content: string;
  response: string;
}


function ChatBox ({ onAddMessage, selectedTheme, setSelectedTheme, themes, addTheme}:ChatBoxProp) {
  const [prompts, setPrompts] = useState<{role: string, content: string}[]>([{ role: 'system', content: 'You are a helpful assistant. Answer as concisely as possible with a little humor expression.' }]);
  //const [theme, setTheme] = useState(selectedTheme);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voicemessage, setVoicemessage] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [response, setResponse] = useState<any>('');

  const generateResponse = async (prompt: string) => {
    const chatHistory = prompts.concat([{ role: 'user', content: prompt }]);
    var res;
    if ( prompts.length >= 5  ) {
      res = await axios.post('/text', {
        input_text: selectedTheme + prompts.slice(prompts.length-5, prompts.length).map(p => p.content).join(' ') + ' ' + prompt,
        chat_history: chatHistory,
      });
    } else {
      res = await axios.post('/text', {
        input_text: selectedTheme + prompts.slice(0, prompts.length).map(p => p.content).join(' ') + ' ' + prompt,
        chat_history: chatHistory,
      });
    }
    const message = res.data;
    if (selectedTheme === '') {
      var text = await axios.post('/text', {
        input_text: 'generate this sentence a 5-word or less title:' + inputText,
      });
      setSelectedTheme(text.data);
      addTheme(text.data, prompt, res.data);
    }
    onAddMessage( 'user', prompt, res.data);
    setPrompts(chatHistory);
    setInputText('');
    setResponse(message);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('inputText',inputText);
    console.log(selectedTheme);
    // if (selectedTheme === '') {
    //   var res = await axios.post('/text', {
    //     input_text: 'generate this sentence a 5-word or less title:' + inputText,
    //   });
    //   setSelectedTheme(res.data);
    //   addTheme(res.data, inputText);
    // }
    generateResponse(inputText);
  };

  const handlemessage =async (mes: string) => {
    //console.log('voicemessage', voicemessage);
    // if (selectedTheme === '') {
    //   var res = await axios.post('/text', {
    //     input_text: 'generate this sentence a 5-word or less title:' + mes,
    //   });
    //   setSelectedTheme(res.data);
    //   addTheme(res.data, mes);
    // }
      generateResponse(mes);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        setVoicemessage(finalTranscript);
        console.log('finalTr', finalTranscript);
        if (finalTranscript!=='') {
          handlemessage(finalTranscript);
        }
        if (event.results[0].isFinal) {
          recognition.stop();
        }
      };
      recognition.onspeechend = () => {
        recognition.stop();
        setIsRecording(false);
      };
      // recognition.onend = () => {
      //   setIsRecording(false);
      // };
      recognition.start();
    } else {
      setIsRecording(false);
    }
  };

  const handleSpeak = () => {
    let synth: SpeechSynthesis;
    let utterance: SpeechSynthesisUtterance;
    synth = window.speechSynthesis;
    utterance = new SpeechSynthesisUtterance();
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = 'en-US';
    synth.onvoiceschanged = () => {
    const voices = synth.getVoices();
    utterance.voice = voices[0];
    };
    utterance.text = response;
    console.log('running');
    synth.speak(utterance);
  }


  // const handleSpeak = () => {
  //     utterance.text = response;
  //     console.log('running');
  //     synth.speak(utterance);
  // };



  return (
    <div>
      <div>
      <button onClick={toggleRecording}>{isRecording ? 'Stop' : 'Start'} Recording</button>
      <div>{voicemessage}</div>
      {response && <button onClick={handleSpeak}>Speak</button>}
        {prompts.map((item, index) => (
          <div key={index} className={item.role}>
            {item.content}
          </div>
        ))}
        {response && <div>{response}</div>}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;