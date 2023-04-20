"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
function ThemeListItem({ themeName, onSelect, onEdit, onDelete, selectedTheme }) {
    const [isEditing, setIsEditing] = react_1.default.useState(false);
    const [newThemeName, setNewThemeName] = react_1.default.useState(themeName);
    function handleEditClick() {
        setIsEditing(true);
    }
    function handleSaveClick() {
        onEdit(themeName, newThemeName);
        setIsEditing(false);
    }
    function handleCancelClick() {
        setIsEditing(false);
        setNewThemeName(themeName);
    }
    return (react_1.default.createElement("div", null, isEditing ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Box, { display: "flex", alignItems: "center", ml: 1, style: {
                borderRadius: '4px',
                backgroundColor: themeName === selectedTheme ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                height: '57px',
                width: '90%',
                margin: '0',
                paddingLeft: '16px',
                paddingRight: '13px',
                paddingTop: 0,
                paddingBottom: 0
            } },
            react_1.default.createElement(icons_1.ChatBubble, { style: { fontSize: '24px', transform: 'scale(0.8)', color: 'white' } }),
            react_1.default.createElement(core_1.TextField, { variant: "standard", value: newThemeName, onChange: (e) => setNewThemeName(e.target.value), inputProps: {
                    style: { color: 'white', borderColor: 'transparent' },
                    endAdornment: (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(core_1.IconButton, { onClick: handleSaveClick, style: { color: 'white' } },
                            react_1.default.createElement(icons_1.Check, null)),
                        react_1.default.createElement(core_1.IconButton, { onClick: handleCancelClick, style: { color: 'white' } },
                            react_1.default.createElement(icons_1.Clear, null))))
                }, style: { width: '95%', height: '25px', border: 'none', outline: 'none', marginTop: '-23px' } })))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.IconButton, { style: {
                borderRadius: '4px',
                height: '57px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: themeName === selectedTheme ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }, onClick: onSelect },
            react_1.default.createElement(core_1.Box, { display: "flex", alignItems: "center", justifyContent: "space-between", position: "absolute", left: "0", right: "0", top: "0", bottom: "0", padding: "0 16px" },
                react_1.default.createElement(core_1.Box, { display: "flex", alignItems: "center" },
                    react_1.default.createElement(icons_1.ChatBubble, { style: { fontSize: '24px', transform: 'scale(0.8)', color: 'white' } }),
                    react_1.default.createElement(core_1.Typography, { style: {
                            color: 'white',
                            textTransform: 'none',
                            maxWidth: '110px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        } }, themeName)),
                react_1.default.createElement(core_1.Box, { display: "flex", alignItems: "center" },
                    react_1.default.createElement(core_1.IconButton, { onClick: handleEditClick, style: { color: 'white' } },
                        react_1.default.createElement(icons_1.Edit, null)),
                    react_1.default.createElement(core_1.IconButton, { onClick: onDelete, style: { color: 'white' } },
                        react_1.default.createElement(icons_1.Delete, null)))))))));
}
exports.default = ThemeListItem;
