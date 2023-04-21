"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const useStyles = (0, core_1.makeStyles)((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px',
    },
    avatar: {
        marginRight: '10px',
    },
    userBubbleContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-end',
        maxWidth: '80%',
        textAlign: 'right',
        marginLeft: 'auto',
    },
    userBubble: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '10px',
        padding: '10px',
        color: 'white',
        maxWidth: '100%',
    },
    compBubbleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: '80%',
    },
    compBubble: {
        backgroundColor: theme.palette.grey[300],
        borderRadius: '10px',
        padding: '10px',
        maxWidth: '100%',
    },
    scrollContainer: {
        height: '400px',
        overflow: 'auto',
    },
    playButton: {
        color: theme.palette.primary.main,
    },
}));
function MessageList({ messages }) {
    const classes = useStyles();
    const [isSpeaking, setIsSpeaking] = react_1.default.useState(false);
    let synthRef = react_1.default.useRef(null);
    let utteranceRef = react_1.default.useRef(null);
    const synth = synthRef.current || window.speechSynthesis;
    const utterance = utteranceRef.current || new SpeechSynthesisUtterance();
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = 'en-US';
    synth.onvoiceschanged = () => {
        const voices = synth.getVoices();
        utterance.voice = voices[0];
    };
    const speak = (res) => {
        synthRef.current = synth;
        utteranceRef.current = utterance;
        utterance.text = res;
        synth.speak(utterance);
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
    };
    return (react_1.default.createElement("div", { className: classes.scrollContainer }, messages.map((message, index) => (react_1.default.createElement("div", { key: index },
        react_1.default.createElement("div", { className: classes.listItem },
            react_1.default.createElement("div", { className: classes.userBubbleContainer },
                react_1.default.createElement(core_1.ListItemAvatar, { className: classes.avatar },
                    react_1.default.createElement(core_1.Avatar, { alt: "user avatar", src: "/path/to/user/avatar" })),
                react_1.default.createElement(core_1.ListItemText, { className: classes.userBubble, primary: message.content })),
            react_1.default.createElement("div", { className: classes.compBubbleContainer },
                react_1.default.createElement(core_1.ListItemAvatar, { className: classes.avatar },
                    react_1.default.createElement(core_1.Avatar, { alt: "computer avatar", src: "/path/to/computer/avatar" })),
                react_1.default.createElement(core_1.ListItemText, { className: classes.compBubble, primary: message.response }),
                react_1.default.createElement(core_1.IconButton, { className: classes.playButton, onClick: () => {
                        if (isSpeaking) {
                            synth.cancel(); // 停止语音播放
                            setIsSpeaking(!isSpeaking); // 更新isSpeaking状态
                        }
                        else {
                            speak(message.response); // 播放语音
                        }
                    } }, isSpeaking ? react_1.default.createElement(icons_1.Pause, null) : react_1.default.createElement(icons_1.PlayArrow, null)))))))));
}
exports.default = MessageList;
