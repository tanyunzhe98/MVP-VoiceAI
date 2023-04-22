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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const icons_2 = require("@material-ui/icons");
const Share = ({ onClose }) => {
    const [link, setLink] = (0, react_1.useState)('');
    const handleCopy = () => {
        navigator.clipboard.writeText(link);
    };
    return (react_1.default.createElement(core_1.Dialog, { open: true, onClose: onClose, maxWidth: "md", fullWidth: true },
        react_1.default.createElement(core_1.DialogTitle, null,
            react_1.default.createElement(core_1.IconButton, { onClick: onClose },
                react_1.default.createElement(icons_1.Close, null))),
        react_1.default.createElement(core_1.DialogContent, { dividers: true },
            react_1.default.createElement(core_1.Typography, { variant: "h5", align: "center", gutterBottom: true }, "Share this page"),
            react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'center', marginBottom: 24 } },
                react_1.default.createElement(core_1.IconButton, null,
                    react_1.default.createElement(icons_2.Facebook, { style: { fontSize: 36 }, component: "svg" })),
                react_1.default.createElement(core_1.IconButton, null,
                    react_1.default.createElement(icons_2.Twitter, { style: { fontSize: 36 }, component: "svg" })),
                react_1.default.createElement(core_1.IconButton, null,
                    react_1.default.createElement(icons_2.LinkedIn, { style: { fontSize: 36 }, component: "svg" })),
                react_1.default.createElement(core_1.IconButton, null,
                    react_1.default.createElement(icons_2.GitHub, { style: { fontSize: 36 }, component: "svg" }))),
            react_1.default.createElement(core_1.TextField, { label: "Link", fullWidth: true, value: link, onChange: (event) => setLink(event.target.value), InputProps: {
                    endAdornment: (react_1.default.createElement(core_1.IconButton, { onClick: handleCopy },
                        react_1.default.createElement(core_1.Typography, { variant: "subtitle1" }, "Copy"))),
                } })),
        react_1.default.createElement(core_1.DialogActions, null,
            react_1.default.createElement(core_1.Button, { onClick: onClose, color: "primary" }, "Close"))));
};
exports.default = Share;
