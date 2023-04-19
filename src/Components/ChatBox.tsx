import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ChatBoxProp {
  onAddMessage: (role: string, content: string) => void;
}

function ChatBox ({ onAddMessage }:ChatBoxProp) {
  const [prompts, setPrompts] = useState<{role: string, content: string}[]>([{ role: 'system', content: 'You are a helpful assistant. Answer as concisely as possible with a little humor expression.' }]);
  const [themes, setThemes] = useState({
    theme1: [
      { role: 'system', content: 'You are a helpful assistant. Answer as concisely as possible with a little humor expression.' }
    ]
  });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voicemessage, setVoicemessage] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [response, setResponse] = useState<any>('');

  const generateResponse = async (prompt: string) => {
    onAddMessage( 'user', prompt );
    const chatHistory = prompts.concat([{ role: 'user', content: prompt }]);
    var res;
    if ( prompts.length >= 5  ) {
      res = await axios.post('/text', {
        input_text: prompts.slice(prompts.length-5, prompts.length).map(p => p.content).join(' ') + ' ' + prompt,
        chat_history: chatHistory,
      });
    } else {
      res = await axios.post('/text', {
        input_text: prompts.slice(0, prompts.length).map(p => p.content).join(' ') + ' ' + prompt,
        chat_history: chatHistory,
      });
    }
    const message = res.data;
    setPrompts(chatHistory);
    setInputText('');
    setResponse(message);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('inputText',inputText);
    generateResponse(inputText);
  };

  const handlemessage = (mes: string) => {
    //console.log('voicemessage', voicemessage);
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