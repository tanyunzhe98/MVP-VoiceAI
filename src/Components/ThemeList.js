"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ThemeListItem_1 = __importDefault(require("./ThemeListItem"));
function ThemeList({ themes, onThemeSelect, onThemeEdit, onThemeDelete, selectedTheme }) {
    function handleThemeEdit(oldThemeName, newThemeName) {
        if (oldThemeName !== newThemeName) {
            onThemeEdit(oldThemeName, newThemeName);
        }
    }
    return (react_1.default.createElement("div", null, themes.map((theme) => (react_1.default.createElement(ThemeListItem_1.default, { key: theme, themeName: theme, onSelect: () => onThemeSelect(theme), onEdit: handleThemeEdit, onDelete: () => onThemeDelete(theme), selectedTheme: selectedTheme })))));
}
exports.default = ThemeList;
