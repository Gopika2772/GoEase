const { log } = require("console");
const db = require("../db");
const bcrypt = require("bcrypt");


const adminRegister = (req, res) => {
    var q = "SELECT * FROM admin WHERE email = ? OR adminName = ? ";

    db.query(q, [req.body.email, req.body.adminName, req.body.password], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        if (data.length!=0) {
            console.log(err);
            return res.status(409).json("Admin already exists!");}


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        q = "INSERT INTO admin(`adminName`,`email`,`password`) VALUES (?)";
        const values = [req.body.adminName, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            return res.status(200).json("Admin Authorized.");
        });
    });
}
// const adminLogin = (req, res) => {
    
//     const q = "SELECT * FROM  user WHERE email=? "

//     db.query(q, [req.body.email], (err, data) => {

//         if (err) {
//             console.log(err);
//             return res.status(500).json(err);
//         }
//         console.log(data.length);
//         if (data.length === 0) return res.status(404).json("Admin not found!");

//         const isPasswordCorrect = bcrypt.compareSync(
//             req.body.password,
//             data[0].password
//         );
//         if (!isPasswordCorrect) {
//             return res.status(400).json("Wrong admin !");
//         } else if (isPasswordCorrect) {
//             return res.status(200).json(data)
//         }
//     });
// };

const adminLogin = (req, res) => {
    const q = "SELECT * FROM  admin WHERE email=? "
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("admin not found!");


        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );
        

        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong admin!");
        } else if (isPasswordCorrect) {
            return res.status(200).json(data)
        }
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

const viewBookings = (req, res) => {
    // const flightNameFilter = req.params.flightNameFilter;
    
    const { flightNameFilter } = req.params;
    console.log(flightNameFilter);
    const q = "SELECT * FROM bookings where flightName=?";
    db.query(q, [flightNameFilter], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        console.log(data);

        if (data.length === 0) {
            return res.status(404).json("No bookings found for the given flight name.");
        }

        return res.status(200).json(data);
    });
};




module.exports = { adminRegister,adminLogin,  addFlight, viewBookings }