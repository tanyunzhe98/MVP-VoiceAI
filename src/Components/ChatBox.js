"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
function ChatBox({ onAddMessage, selectedTheme, setSelectedTheme, themes, addTheme }) {
    const [prompts, setPrompts] = (0, react_1.useState)([{ role: 'system', content: 'You are a helpful assistant. Answer as concisely as possible with a little humor expression.' }]);
    //const [theme, setTheme] = useState(selectedTheme);
    const [isRecording, setIsRecording] = (0, react_1.useState)(false);
    const [voicemessage, setVoicemessage] = (0, react_1.useState)('');
    const [inputText, setInputText] = (0, react_1.useState)('');
    const [response, setResponse] = (0, react_1.useState)('');
    const generateResponse = (prompt) => __awaiter(this, void 0, void 0, function* () {
        const chatHistory = prompts.concat([{ role: 'user', content: prompt }]);
        var res;
        if (prompts.length >= 5) {
            res = yield axios_1.default.post('/text', {
                input_text: selectedTheme + prompts.slice(prompts.length - 5, prompts.length).map(p => p.content).join(' ') + ' ' + prompt,
                chat_history: chatHistory,
            });
        }
        else {
            res = yield axios_1.default.post('/text', {
                input_text: selectedTheme + prompts.slice(0, prompts.length).map(p => p.content).join(' ') + ' ' + prompt,
                chat_history: chatHistory,
            });
        }
        const message = res.data;
        if (selectedTheme === '') {
            var text = yield axios_1.default.post('/text', {
                input_text: 'generate this sentence a 5-word or less title:' + inputText,
            });
            setSelectedTheme(text.data);
            addTheme(text.data, prompt, res.data);
        }
        onAddMessage('user', prompt, res.data);
        setPrompts(chatHistory);
        setInputText('');
        setResponse(message);
    });
    const handleSubmit = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        console.log('inputText', inputText);
        console.log(selectedTheme);
        // if (selectedTheme === '') {
        //   var res = await axios.post('/text', {
        //     input_text: 'generate this sentence a 5-word or less title:' + inputText,
        //   });
        //   setSelectedTheme(res.data);
        //   addTheme(res.data, inputText);
        // }
        generateResponse(inputText);
    });
    const handlemessage = (mes) => __awaiter(this, void 0, void 0, function* () {
        //console.log('voicemessage', voicemessage);
        // if (selectedTheme === '') {
        //   var res = await axios.post('/text', {
        //     input_text: 'generate this sentence a 5-word or less title:' + mes,
        //   });
        //   setSelectedTheme(res.data);
        //   addTheme(res.data, mes);
        // }
        generateResponse(mes);
    });
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
                    }
                    else {
                        interimTranscript += transcript;
                    }
                }
                setVoicemessage(finalTranscript);
                console.log('finalTr', finalTranscript);
                if (finalTranscript !== '') {
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
        }
        else {
            setIsRecording(false);
        }
    };
    const handleSpeak = () => {
        let synth;
        let utterance;
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
    };
    // const handleSpeak = () => {
    //     utterance.text = response;
    //     console.log('running');
    //     synth.speak(utterance);
    // };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: toggleRecording },
                isRecording ? 'Stop' : 'Start',
                " Recording"),
            react_1.default.createElement("div", null, voicemessage),
            response && react_1.default.createElement("button", { onClick: handleSpeak }, "Speak"),
            prompts.map((item, index) => (react_1.default.createElement("div", { key: index, className: item.role }, item.content))),
            response && react_1.default.createElement("div", null, response)),
        react_1.default.createElement("form", { onSubmit: handleSubmit },
            react_1.default.createElement("input", { type: "text", value: inputText, onChange: (e) => setInputText(e.target.value) }),
            react_1.default.createElement("button", { type: "submit" }, "Send"))));
}
;
exports.default = ChatBox;
