const mysql = require('mysql');
const dbConfig = require('../config/db.conifg.js');

var connection = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`   
});

module.exports = connection;