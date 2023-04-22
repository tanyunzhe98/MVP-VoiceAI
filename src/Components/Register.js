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
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const axios_1 = __importDefault(require("axios"));
const Register = ({ onClose, setShowLogin }) => {
    const [username, setUsername] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle register logic here
        axios_1.default.post('/rsvps', {
            username: username,
            password: password
        })
            .then(() => {
        }).catch((err) => {
            console.log(err);
        });
    };
    return (react_1.default.createElement(core_1.Dialog, { open: true, onClose: onClose, maxWidth: "xs", style: { height: 999, top: '-20vh' } },
        react_1.default.createElement(core_1.Typography, { component: "h5", style: { display: 'flex', alignItems: 'center', gap: 1 } },
            react_1.default.createElement(core_1.IconButton, { "aria-label": "close", onClick: onClose },
                react_1.default.createElement(icons_1.Close, null))),
        react_1.default.createElement(core_1.DialogContent, { style: { display: 'flex', flexDirection: 'column', gap: 2 } },
            react_1.default.createElement("form", { onSubmit: handleSubmit },
                react_1.default.createElement(core_1.TextField, { label: "Username", value: username, onChange: (event) => setUsername(event.target.value), required: true, autoFocus: true, margin: "dense", fullWidth: true }),
                react_1.default.createElement(core_1.TextField, { label: "Password", type: "password", value: password, onChange: (event) => setPassword(event.target.value), required: true, margin: "dense", fullWidth: true }),
                react_1.default.createElement(core_1.DialogActions, null,
                    react_1.default.createElement(core_1.Button, { type: "submit", variant: "contained", style: { width: '100%' } }, "Register"))),
            react_1.default.createElement(core_1.Typography, { align: "center" },
                "Already a user?",
                ' ',
                react_1.default.createElement(core_1.Button, { color: "primary", onClick: () => { onClose(); setShowLogin(true); } }, "Login")))));
};
exports.default = Register;
