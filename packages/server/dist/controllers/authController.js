"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const loginUser = async (req, res) => {
    res.send("Login User");
};
exports.loginUser = loginUser;
const registerUser = async (req, res) => {
    res.send("Register User");
};
exports.registerUser = registerUser;
