import mysql from 'promise-mysql';

import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB is Connected');
    });

export default pool;


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