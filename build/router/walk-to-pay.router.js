"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_login_controller_1 = __importDefault(require("../controller/user-login.controller"));
//import {  } from './templates'
class WalkToPay {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/login/getUser', user_login_controller_1.default.getUser);
    }
}
exports.default = new WalkToPay().router;
//export default walkToPay_Routes.router;
