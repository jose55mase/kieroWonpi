"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walk_to_pay_router_1 = __importDefault(require("./router/walk-to-pay.router"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.router();
    }
    config() {
        this.app.set('port', process.env.PORT || 3002);
    }
    router() {
        this.app.use(walk_to_pay_router_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port ", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
