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
const ThemeListItem_1 = __importDefault(require("./ThemeListItem"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const UserContext_1 = __importDefault(require("../UserContext"));
const ThemeList = ({ themes, onThemeSelect, onThemeEdit, onThemeDelete, selectedTheme, onClearConversation, onPageChange }) => {
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const { user, setUser, userid, setUserid } = (0, react_1.useContext)(UserContext_1.default);
    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleMenuClose() {
        setAnchorEl(null);
    }
    function handleThemeEdit(oldThemeName, newThemeName) {
        if (oldThemeName !== newThemeName) {
            onThemeEdit(oldThemeName, newThemeName);
        }
    }
    return (react_1.default.createElement("div", null,
        themes.map((theme) => (react_1.default.createElement(ThemeListItem_1.default, { key: theme.name, themeName: theme.name, onSelect: () => onThemeSelect(theme.name), onEdit: handleThemeEdit, onDelete: () => onThemeDelete(theme.name, theme._id), selectedTheme: selectedTheme }))),
        react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' } },
            react_1.default.createElement(core_1.Button, { style: { width: '100%' }, startIcon: react_1.default.createElement(icons_1.Home, null), onClick: onPageChange, className: 'button' }, "Home")),
        react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' } },
            react_1.default.createElement(core_1.Button, { style: { display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }, className: 'button', onClick: handleMenuOpen },
                react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-around' } },
                    react_1.default.createElement(icons_1.AccountCircle, null),
                    react_1.default.createElement("span", { style: { marginLeft: '0.5rem' } }, user)),
                react_1.default.createElement(icons_1.MoreVert, null))),
        react_1.default.createElement(core_1.Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleMenuClose },
            react_1.default.createElement(core_1.MenuItem, { onClick: () => { setUser(''); setUserid(''); handleMenuClose(); } },
                react_1.default.createElement(icons_1.ExitToApp, { style: { marginRight: '0.5rem' } }),
                "Log out"),
            react_1.default.createElement(core_1.MenuItem, { onClick: onClearConversation },
                react_1.default.createElement(icons_1.ClearAll, { style: { marginRight: '0.5rem' } }),
                "Clear conversation"))));
};
exports.default = ThemeList;
