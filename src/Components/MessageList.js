"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function MessageList({ messages }) {
    return (react_1.default.createElement("ul", null, messages.map((message, index) => (react_1.default.createElement("li", { key: index },
        react_1.default.createElement("strong", null,
            message.role,
            ": "),
        message.content,
        message.response)))));
}
exports.default = MessageList;
