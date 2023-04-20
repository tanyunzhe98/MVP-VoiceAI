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
const react_bootstrap_1 = require("react-bootstrap");
const ChatBox_1 = __importDefault(require("./ChatBox"));
const MessageList_1 = __importDefault(require("./MessageList"));
const ThemeList_1 = __importDefault(require("./ThemeList"));
const NewThemeButton_1 = __importDefault(require("./NewThemeButton"));
function ChatPage() {
    var _a, _b;
    const [themes, setThemes] = (0, react_1.useState)([]);
    const [selectedTheme, setSelectedTheme] = (0, react_1.useState)('');
    function addTheme(themeName, message, res) {
        if (themes.some(theme => theme.name === themeName)) {
            alert(`Cannot add ${themeName}, name already exists`);
            return;
        }
        var newTheme;
        if (!message || !res) {
            newTheme = {
                name: themeName,
                messages: []
            };
        }
        else {
            newTheme = {
                name: themeName,
                messages: [{ role: 'user', content: message, response: res }]
            };
        }
        // const newTheme = {
        //   name: themeName,
        //   messages: [{role: 'user', content: message}]??[]
        // };
        setThemes([...themes, newTheme]);
        setSelectedTheme(themeName);
    }
    function addMessage(role, content, response) {
        if (selectedTheme) {
            const updatedThemes = themes.map(theme => {
                if (theme.name === selectedTheme) {
                    return Object.assign(Object.assign({}, theme), { messages: [...theme.messages, { role, content, response }] });
                }
                else {
                    return theme;
                }
            });
            setThemes(updatedThemes);
        }
    }
    function changeThemeName(oldThemeName, newThemeName) {
        if (newThemeName === oldThemeName) {
            return;
        }
        if (themes.some(theme => theme.name === newThemeName)) {
            alert(`Cannot change theme name to ${newThemeName}, name already exists`);
            return;
        }
        const updatedThemes = themes.map(theme => {
            if (theme.name === oldThemeName) {
                return Object.assign(Object.assign({}, theme), { name: newThemeName });
            }
            else {
                return theme;
            }
        });
        setThemes(updatedThemes);
        if (selectedTheme === oldThemeName) {
            setSelectedTheme(newThemeName);
        }
    }
    function deleteTheme(themeName) {
        if (selectedTheme === themeName) {
            alert(`Cannot delete theme ${themeName}, theme using`);
            return;
        }
        const updatedThemes = themes.filter(theme => theme.name !== themeName);
        setThemes(updatedThemes);
    }
    return (react_1.default.createElement("div", { className: 'chatpage' },
        react_1.default.createElement("div", { className: "menu" },
            react_1.default.createElement(NewThemeButton_1.default, { onAddTheme: addTheme }),
            react_1.default.createElement(ThemeList_1.default, { themes: themes.map(theme => theme.name), onThemeSelect: setSelectedTheme, onThemeEdit: changeThemeName, onThemeDelete: deleteTheme, selectedTheme: selectedTheme })),
        react_1.default.createElement("div", { className: "mainchat" },
            react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: () => setSelectedTheme('') }, "Back"),
            react_1.default.createElement("h2", null, selectedTheme),
            react_1.default.createElement(MessageList_1.default, { messages: (_b = (_a = themes.find(theme => theme.name === selectedTheme)) === null || _a === void 0 ? void 0 : _a.messages) !== null && _b !== void 0 ? _b : [] }),
            react_1.default.createElement(ChatBox_1.default, { onAddMessage: addMessage, selectedTheme: selectedTheme, setSelectedTheme: setSelectedTheme, addTheme: addTheme, themes: themes }))));
}
exports.default = ChatPage;
