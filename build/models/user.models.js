"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const pool = require('../database');
const sql = __importStar(require("mssql"));
const database_1 = __importDefault(require("../database"));
class UserModel {
    selectUsers(res) {
        return __awaiter(this, void 0, void 0, function* () {
            //EXEC SP_LOGIN_USERS @email='{0}',@password='{1}'
            const listUser = `SELECT * FROM users WHERE password LIKE '${res}'`;
            //const listUser = `EXEC SP_LOGIN_USERS @email='${res.email}',@password='${res.password}'`;
            try {
                database_1.default.connect().then(() => __awaiter(this, void 0, void 0, function* () {
                    const request = new sql.Request(database_1.default);
                    const result = yield request.query(listUser);
                    console.log(result);
                    return result;
                }));
            }
            catch (err) {
                console.log("error");
            }
        });
    }
    createUser(res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("joasdf: ", res);
            /*
            const user = `INSERT INTO users (name,lastname,nickname,email,password,source_ip,email_status,status,create_at,token_confirmation_email,email_confirmation_sent_on)
            VALUES (
              '${res.name}',
              '${res.lastname}',
              '${res.nickname}',
              '${res.email}',
              '${res.password}',
              
              
              );`;
            try{
              pool.connect().then( async () => {
                const request = new sql.Request(pool);
                const result =  await request.query(user);
                console.log(result)
                return result;
              });
            }catch(err){
              console.log("error");
            }
            */
        });
    }
}
const userModel = new UserModel;
exports.default = userModel;
