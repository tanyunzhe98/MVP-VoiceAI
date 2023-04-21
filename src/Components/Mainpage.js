"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
require("./style.css");
const Mainpage = ({ onPageChange }) => {
    return (react_1.default.createElement(react_bootstrap_1.Container, { fluid: true, className: "main-page-container" },
        react_1.default.createElement(react_bootstrap_1.Navbar, { bg: "primary", variant: "dark" },
            react_1.default.createElement(react_bootstrap_1.Navbar.Brand, null, "VoiceAI"),
            react_1.default.createElement(react_bootstrap_1.Navbar.Toggle, { "aria-controls": "navbar-nav" }),
            react_1.default.createElement(react_bootstrap_1.Navbar.Collapse, { id: "navbar-nav", className: "justify-content-end" },
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-light" }, "Share"))),
        react_1.default.createElement("div", { className: "jumbotron" },
            react_1.default.createElement("div", { className: "center-area" },
                react_1.default.createElement("h1", null, "A brief introduction"),
                react_1.default.createElement("p", { className: "app-intro" }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", size: "lg", onClick: onPageChange }, "Try it"))),
        react_1.default.createElement("div", { className: "bottom-area" },
            react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary" }, "Login"),
            react_1.default.createElement(react_bootstrap_1.Button, { variant: "dark" }, "Register"))));
};
exports.default = Mainpage;
