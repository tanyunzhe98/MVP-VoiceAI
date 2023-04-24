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
const ChatBox_1 = __importDefault(require("./ChatBox"));
const MessageList_1 = __importDefault(require("./MessageList"));
const ThemeList_1 = __importDefault(require("./ThemeList"));
const NewThemeButton_1 = __importDefault(require("./NewThemeButton"));
const ChevronLeft_1 = __importDefault(require("@material-ui/icons/ChevronLeft"));
const core_1 = require("@material-ui/core");
const UserContext_1 = __importDefault(require("../UserContext"));
const axios_1 = __importDefault(require("axios"));
function ChatPage({ onPageChange }) {
    const [themes, setThemes] = (0, react_1.useState)([]);
    const [selectedTheme, setSelectedTheme] = (0, react_1.useState)('');
    const [selectedThemeid, setSelectedThemeid] = (0, react_1.useState)('');
    const [messages, setMessages] = (0, react_1.useState)([]);
    const { user, setUser, userid, setUserid } = (0, react_1.useContext)(UserContext_1.default);
    (0, react_1.useEffect)(() => {
        const fetchTopics = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // 发送 Axios 请求，获取当前用户的所有话题
                const response = yield axios_1.default.get(`/user/theme/${userid}`);
                // TODO: 处理请求返回的数据
                console.log('successfully get the data', response.data);
                setThemes(response.data);
            }
            catch (err) {
                // TODO: 处理请求错误
                console.error(err);
            }
        });
        // 仅在 user 属性变化时发送请求
        if (user) {
            fetchTopics();
        }
    }, [userid]);
    function addTheme(themeName, message, res) {
        if (themes.some(theme => theme.name === themeName)) {
            alert(`Cannot add ${themeName}, name already exists`);
            return '';
        }
        var newTheme;
        if (!message || !res) {
            axios_1.default.post('/user/theme', {
                name: themeName,
                owner: userid
            }).then(response => {
                console.log(response);
                newTheme = {
                    name: themeName,
                    messages: [],
                    _id: response.data._id,
                };
                setThemes([...themes, newTheme]);
                setSelectedTheme(themeName);
                return response.data._id;
            }).catch(error => {
                console.log(error);
            });
        }
        else {
            axios_1.default.post('/user/theme', {
                name: themeName,
                owner: userid
            }).then(response => {
                console.log(response);
                newTheme = {
                    name: themeName,
                    messages: [{ role: 'user', content: message, response: res }],
                    _id: response.data._id,
                };
                setThemes([...themes, newTheme]);
                setSelectedTheme(themeName);
                return response.data._id;
            }).catch(error => {
                console.log(error);
            });
        }
        return '';
        // const newTheme = {
        //   name: themeName,
        //   messages: [{role: 'user', content: message}]??[]
        // };
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
        axios_1.default.post('/user/theme/message', {
            topic: selectedThemeid,
            content: content,
            response: response,
            creator: userid,
        }).then(res => { console.log(res.data); }).catch(error => {
            console.log(error);
        });
    }
    function changeThemeName(oldThemeName, newThemeName) {
        if (newThemeName === oldThemeName) {
            return;
        }
        if (themes.some(theme => theme.name === newThemeName)) {
            alert(`Cannot change theme name to ${newThemeName}, name already exists`);
            return;
        }
        axios_1.default.put(`/user/theme/${oldThemeName}`, {
            name: newThemeName
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
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
    function deleteTheme(themeName, themeid) {
        if (selectedTheme === themeName) {
            alert(`Cannot delete theme ${themeName}, theme using`);
            return;
        }
        axios_1.default.delete(`/user/theme/${themeid}`)
            .then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
        const updatedThemes = themes.filter(theme => theme.name !== themeName);
        setThemes(updatedThemes);
    }
    return (react_1.default.createElement("div", { className: 'chatpage' },
        react_1.default.createElement("div", { className: "menu" },
            react_1.default.createElement(NewThemeButton_1.default, { onAddTheme: addTheme }),
            react_1.default.createElement(ThemeList_1.default, { themes: themes, onThemeSelect: setSelectedTheme, onThemeidSelect: setSelectedThemeid, onThemeEdit: changeThemeName, onThemeDelete: deleteTheme, onPageChange: onPageChange, setMessages: setMessages, selectedTheme: selectedTheme, onClearConversation: function () {
                    throw new Error('Function not implemented.');
                } })),
        react_1.default.createElement("div", { className: "mainchat" },
            react_1.default.createElement(core_1.IconButton, { style: { color: '#187ce0' }, onClick: () => setSelectedTheme('') },
                react_1.default.createElement(ChevronLeft_1.default, null)),
            react_1.default.createElement(MessageList_1.default, { messages: messages }),
            react_1.default.createElement(ChatBox_1.default, { onAddMessage: addMessage, selectedTheme: selectedTheme, setSelectedTheme: setSelectedTheme, addTheme: addTheme, setSelectedThemeid: setSelectedThemeid, themes: themes }))));
}
exports.default = ChatPage;
