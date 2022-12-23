const mysql = require("mysql2");
// Read the environment variables
require("dotenv").config();

const mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.MYSQL_USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    multipleStatements: true
});

mysqlConnection.connect(error => {
    if (error) {
        console.log(err);
        console.log("Connection Failed");
    } else {
        console.log("Connected");
    }
});

module.exports = mysqlConnection;
