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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./style.css");
const Register_1 = __importDefault(require("./Register"));
const login_1 = __importDefault(require("./login"));
const Share_1 = __importDefault(require("./Share"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const logo = require('./logo.png').default;
const bg = require('./background.jpg').default;
const Mainpage = ({ onPageChange }) => {
    const [showRegister, setShowRegister] = (0, react_1.useState)(false);
    const [showLogin, setShowLogin] = (0, react_1.useState)(false);
    const [showContent, setShowContent] = (0, react_1.useState)(false);
    const [showShare, setShowShare] = (0, react_1.useState)(false);
    const [imageLoaded, setImageLoaded] = (0, react_1.useState)(false);
    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    const styles = {
        position: 'relative',
        minHeight: '100vh',
    };
    return (react_1.default.createElement(core_1.Box, { sx: styles },
        react_1.default.createElement(core_1.Box, { sx: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: -1,
            } },
            react_1.default.createElement("img", { src: bg, alt: "background", onLoad: handleImageLoad, style: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    objectFit: 'cover',
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity .5s ease-in-out',
                    filter: 'brightness(70%)',
                } })),
        react_1.default.createElement(core_1.Box, { sx: { bgcolor: 'transparent', py: 8, minHeight: 'inherit' } },
            react_1.default.createElement(core_1.Box, { sx: { display: 'flex', justifyContent: 'center' } },
                react_1.default.createElement("img", { src: logo, alt: "VoiceAI Logo", height: "200", style: { filter: "grayscale(100%) brightness(1)" } })),
            react_1.default.createElement(core_1.Typography, { variant: "h2", align: "center", style: { background: 'linear-gradient(45deg, #b3d9ff 30%, #e8d2ff 60%, #b2c7ff 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Futura' } }, "VoiceAI"),
            showContent ? (react_1.default.createElement(core_1.Typography, { variant: "body1", align: "center", style: { color: 'white', fontFamily: 'Helvetica' } }, "The all-in-one app that will change the way you interact with your device. Our app is designed to revolutionize the way we communicate with technology by using the power of voice recognition and artificial intelligence. With voiceAI, you can use your voice to generate AI responses that can be transformed into spoken words. Plus, our app can recognize emotions in sound, which means you can experience a more personalized and intuitive conversation with your device. What's more, voiceAI also has the ability to generate pictures, making it a comprehensive application of AI.")) : (react_1.default.createElement(core_1.Grid, { container: true, justifyContent: "center" },
                react_1.default.createElement(core_1.Typography, { variant: "body1", align: "center", style: { color: 'white', fontFamily: 'Helvetica' } },
                    "The all-in-one app that will change the way you interact with your device.",
                    react_1.default.createElement(core_1.Button, { color: "primary", onClick: () => setShowContent(true) },
                        react_1.default.createElement("span", { style: {
                                backgroundImage: 'linear-gradient(45deg, white 30%, #00c5ff 60%, #ff4b1f 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            } }, "Learn More"))))),
            react_1.default.createElement(core_1.Box, { sx: { display: 'flex', justifyContent: 'center' } },
                react_1.default.createElement(core_1.Button, { variant: "contained", onClick: onPageChange, style: {
                        color: '#fff',
                        background: 'linear-gradient(45deg, #0077be 30%, #7b3d91 60%, #0051a8 90%)',
                        boxShadow: '0 3px 5px 2px rgba(0, 81, 168, .3)',
                    } }, "Try it"))),
        react_1.default.createElement(core_1.Box, { sx: { position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: '#2b86c5', py: 4, width: '50%' } },
            react_1.default.createElement(core_1.Box, { sx: { display: 'flex', justifyContent: 'center', mb: 4, marginBottom: '3%' } },
                react_1.default.createElement(core_1.Button, { variant: "contained", startIcon: react_1.default.createElement(icons_1.Person, null), onClick: () => setShowLogin(true), style: {
                        color: '#fff',
                        background: 'linear-gradient(45deg, #0077be 30%, #7b3d91 60%, #0051a8 90%)',
                        boxShadow: '0 3px 5px 2px rgba(0, 81, 168, .3)',
                    } }, "Login"),
                react_1.default.createElement(core_1.Box, { sx: { mx: 2 } }),
                react_1.default.createElement(core_1.Button, { variant: "contained", startIcon: react_1.default.createElement(icons_1.Lock, null), onClick: () => setShowRegister(true), style: {
                        color: '#fff',
                        background: 'linear-gradient(45deg, #0077be 30%, #7b3d91 60%, #0051a8 90%)',
                        boxShadow: '0 3px 5px 2px rgba(0, 81, 168, .3)',
                    } }, "Register"),
                react_1.default.createElement(core_1.Box, { sx: { mx: 2 } }),
                react_1.default.createElement(core_1.Button, { variant: "contained", endIcon: react_1.default.createElement(icons_1.Reply, null), onClick: () => setShowShare(true), style: {
                        color: '#fff',
                        background: 'linear-gradient(45deg, #0077be 30%, #7b3d91 60%, #0051a8 90%)',
                        boxShadow: '0 3px 5px 2px rgba(0, 81, 168, .3)',
                    } }, "Share"))),
        showLogin && react_1.default.createElement(login_1.default, { onClose: () => setShowLogin(false) }),
        showRegister && react_1.default.createElement(Register_1.default, { onClose: () => setShowRegister(false), setShowLogin: setShowLogin }),
        showShare && react_1.default.createElement(Share_1.default, { onClose: () => setShowShare(false) })));
};
exports.default = Mainpage;
