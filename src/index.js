"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const Mainpage_1 = __importDefault(require("./Components/Mainpage"));
const ChatPage_1 = __importDefault(require("./Components/ChatPage"));
const App = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Mainpage_1.default, null),
        react_1.default.createElement(ChatPage_1.default, null)));
};
react_dom_1.default.render(react_1.default.createElement(App, null), document.getElementById("root"));
