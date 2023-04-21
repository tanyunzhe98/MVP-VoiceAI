"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const Mainpage_1 = __importDefault(require("./Components/Mainpage"));
const ChatPage_1 = __importDefault(require("./Components/ChatPage"));
var Page;
(function (Page) {
    Page[Page["MAIN"] = 0] = "MAIN";
    Page[Page["CHAT"] = 1] = "CHAT";
})(Page || (Page = {}));
const App = () => {
    const [currentPage, setCurrentPage] = react_1.default.useState(Page.MAIN);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (react_1.default.createElement("div", { style: {
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "100%",
        } },
        react_1.default.createElement("div", { style: {
                display: "flex",
                width: "200%",
                transform: `translateX(-${currentPage * 50}%)`,
                transition: "transform 0.5s ease-in-out",
            } },
            react_1.default.createElement("div", { style: { width: "50%" } },
                react_1.default.createElement(Mainpage_1.default, { onPageChange: () => handlePageChange(Page.CHAT) })),
            react_1.default.createElement("div", { style: { width: "50%" } },
                react_1.default.createElement(ChatPage_1.default, { onPageChange: () => handlePageChange(Page.MAIN) })))));
};
react_dom_1.default.render(react_1.default.createElement(App, null), document.getElementById("root"));
