const db = require("../db");
const bcrypt = require("bcrypt");


const adminRegister = (req, res) => {
    var q = "SELECT * FROM admin WHERE email = ? OR adminName = ? OR adminId=?";

    db.query(q, [req.body.email, req.body.adminName, req.body.adminId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Admin already exists!");


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        q = "INSERT INTO admin(`adminId`,`adminName`,`email`,`password`) VALUES (?)";
        const values = [req.body.adminId, req.body.adminName, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Admin Authorized.");
        });
    });
}
const adminLogin = (req, res) => {
    const query = "SELECT * FROM  admin WHERE adminId=? OR adminName=? "
    db.query(q, [req.body.adminName, req.body.adminId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Admin not found!");

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );
        if (isPasswordCorrect(req.body.password)) {
            res.status(200).json("Admin Logged in");
        }

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong  Admin username or password!");
    });
};


// export const addAdmin = (req, res) => {

//     const q =
//         "INSERT INTO admin(`adminId`,`adminName`,`email`,`password`) VALUES (?)";

//     const values = [
//         req.body.adminId,
//         req.body.adminName,
//         req.body.email,
//         req.body.password,
//     ];
//     db.query(q, [values], (err, data) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json(err);
//         } else {
//             return res.json("admin added");
//         }
//     });
// };

// export const updateAdmin = (req, res) => {

//     const q =
//         "UPDATE admin SET `adminId`=?,`adminName`=?,`email`=?,`password`=?";

//     const values = [req.body.adminId, req.body.adminName, req.body.email, req.body.password];

//     db.query(q, [values], (err, data) => {
//         if (err) return res.status(500).json(err);
//         return res.json("Admin details updated.");
//     });
// };

// export const deleteAdmin = (req, res) => {
//     const q = "DELETE FROM admin WHERE `adminId` = ?";

//     db.query(q, [req.body.adminId], (err, data) => {
//         if (err) return res.status(403).json("Admin not deleted");

//         return res.json("Admin deleted");
//     });

// };

// const addFlight = (req, res) => {
//     const q = "INSERT INTO flights (`flightId`, `flightName`, `date`) VALUES (?, ?, ?)";


//     const values = [req.body.flightId, req.body.flightName, req.body.date];


//     db.query(q, values, (err, data) => {
//         if (err) {
//             return res.status(500).json(err);
//         }

//         return res.status(200).json("Flight added successfully.");
//     });
// };
const addFlight = (req, res) => {
    const q = "INSERT INTO flights ( `flightName`, `fromDestination`, `toDestination`, `noOfSeats`, `date`,`time`) VALUES ( ?, ?, ?, ?, ?,?)";
console.log(req.body);
    const maxSeatsPerFlight = 60;

    const values = [
        req.body.flightName,
        req.body.fromDestination,
        req.body.toDestination,
        60,
        req.body.date,
        req.body.time
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);

        }

        return res.status(200).json("Flight added successfully.");
    });
};



module.exports = { adminRegister, adminLogin, addFlight }