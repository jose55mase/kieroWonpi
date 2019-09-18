"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
pool.getConnection()
    .then(connection => {
    pool.releaseConnection(connection);
    console.log('DB is Connected');
});
exports.default = pool;
/*
const sql = require('mssql');

const config = {
        // Old connection
   // server: '204.141.52.148',
   // user: 'MachineBaseConnect3651',
   // password: 'H1#KotS(xh5nF+tGv',
   // database: 'DBKiero_Productos'
   
        // New Connection
    server: '190.85.232.78',
    user: 'sa',
    password: 'S3rv3r1-27!',
    database: 'DBKiero_Productos'
};

sql.connect(config, function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connection established');
});

module.exports = sql;
*/ 
