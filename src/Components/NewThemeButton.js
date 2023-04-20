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
function NewThemeButton({ onAddTheme }) {
    const [themeName, setThemeName] = (0, react_1.useState)('');
    const [showInput, setShowInput] = (0, react_1.useState)(false);
    const handleAddTheme = () => {
        if (themeName.trim()) {
            onAddTheme(themeName.trim());
            setShowInput(false);
            setThemeName('');
        }
    };
    const handleShowInput = () => {
        setShowInput(true);
    };
    const handleCancelInput = () => {
        setShowInput(false);
        setThemeName('');
    };
    const useStyles = (0, core_1.makeStyles)((theme) => ({
        whiteBorder: {
            borderColor: 'white !important',
            borderWidth: 1,
            borderRadius: 4
        }
    }));
    const classes = useStyles();
    return (react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } }, showInput ? (react_1.default.createElement("div", { style: { flex: 1 } },
        react_1.default.createElement(core_1.TextField, { variant: "outlined", value: themeName, onChange: (event) => setThemeName(event.target.value), InputLabelProps: {
                style: {
                    color: 'white'
                }
            }, InputProps: {
                style: {
                    color: 'white',
                    borderColor: 'white'
                },
                endAdornment: (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(core_1.IconButton, { style: { color: 'white' }, onClick: handleAddTheme },
                        react_1.default.createElement(icons_1.Check, null)),
                    react_1.default.createElement(core_1.IconButton, { style: { color: 'white' }, onClick: handleCancelInput },
                        react_1.default.createElement(icons_1.Clear, null)))),
                classes: {
                    notchedOutline: classes.whiteBorder // 使用自定义类名
                }
            }, className: "custom-text-field", style: { width: '100%', borderColor: 'white' } }))) : (react_1.default.createElement("div", { style: { flex: 1 } },
        react_1.default.createElement(core_1.Button, { className: "new-theme-button", onClick: handleShowInput, variant: "outlined", style: { borderColor: 'white', color: 'white', height: '100%', width: '100%' } }, "+ New theme")))));
}
exports.default = NewThemeButton;
