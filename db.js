const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    database: "flightreservation",
    user: "gopika",
    password: "password",
});
module.exports = db