"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const walk_to_pay_controller_1 = __importDefault(require("../controller/walk-to-pay.controller"));
//import {  } from './templates'
class WalkToPay {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/kk', walk_to_pay_controller_1.default.startWompi);
        this.router.get('/', walk_to_pay_controller_1.default.createPay);
    }
}
exports.default = new WalkToPay().router;
//export default walkToPay_Routes.router;