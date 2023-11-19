const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "localhost",
    database: "flightReservation",
    user: "root",
    password: "Gopika01#",
});
module.exports = db