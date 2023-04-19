"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function ThemeListItem({ themeName, onSelect, onEdit, onDelete }) {
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
    return (react_1.default.createElement("li", null, isEditing ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", { type: "text", value: newThemeName, onChange: (e) => setNewThemeName(e.target.value) }),
        react_1.default.createElement("button", { onClick: handleSaveClick }, "Save"),
        react_1.default.createElement("button", { onClick: handleCancelClick }, "Cancel"))) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { onClick: onSelect }, themeName),
        react_1.default.createElement("button", { onClick: handleEditClick }, "Edit"),
        react_1.default.createElement("button", { onClick: onDelete }, "Delete")))));
}
exports.default = ThemeListItem;
