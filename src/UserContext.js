"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const UserContext = (0, react_1.createContext)({
    user: "",
    setUser: () => { },
});
exports.default = UserContext;
