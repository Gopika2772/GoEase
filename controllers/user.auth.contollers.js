const db = require("../db");
const bcrypt = require("bcrypt");


// const userRegister = (req, res) => {
//     var q = "SELECT * FROM user WHERE email=?";

//     db.query(q, [req.body.email, req.body.username], (err, data) => {
//         if (err) return res.status(500).json(err);
//         if (data.length) return res.status(409).json("User already exists!");


//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);

//         q = "INSERT INTO user(`userId`,username`,`email`,`password`) VALUES (?)";
//         const values = [req.body.username, req.body.email, hash];

//         db.query(q, [values], (err, data) => {
//             if (err) return res.status(500).json(err);
//             return res.status(200).json("User has been created.");
//         });
//     });
// }
const userRegister = (req, res) => {
    var q = "SELECT * FROM user WHERE username = ? OR email = ?";

    db.query(q, [req.body.userName, req.body.email], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (data.length) {
            return res.status(409).json("User already exists!");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        q = "INSERT INTO user (`username`, `email`, `password`) VALUES (?)";
        const values = [req.body.userName, req.body.email, hash];


        db.query(q, [values], (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.status(200).json("User has been created.");
        });
    });
};


const userLogin = (req, res) => {
    const q = "SELECT * FROM  user WHERE email=? "
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");


        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong username or password!");
        } else if (isPasswordCorrect) {
            return res.status(200).json(data)
        }
    });
};

const searchFlightsByDate = (req, res) => {

    const q = "SELECT flightId, flightName FROM flights WHERE date = ?";


    const date = req.query.date;


    db.query(q, [date], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json("No flights found for the given date.");
        }


        const simplifiedData = data.map(flight => ({
            flightId: flight.flightId,
            flightName: flight.flightName
        }));

        return res.status(200).json(simplifiedData);
    });
};

const searchFlights = (req, res) => {

    const q = "SELECT * FROM flights WHERE date = ? AND fromDestination = ? AND toDestination = ? ";

    // console.log("running");
    const date = req.query.date;
    const from = req.query.fromDestination;
    const to = req.query.toDestination;


    db.query(q, [date, from, to], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json("No flights found for the given date.");
        }
        console.log(data);


        const simplifiedData = data.map(flight => ({
            flightId: flight.flightId,
            flightName: flight.flightName,
            flightDate: flight.date,
            flightFrom: flight.fromDestination,
            flightTo: flight.toDestination,
            flightTime: flight.time
        }));

        return res.status(200).json(simplifiedData);
    });
};

const bookTicket = (req, res) => {
    const qCheckSeats = "SELECT noOfSeats FROM flights WHERE flightId = ?";
    const qBookTicket = "INSERT INTO bookings (`userId`, `flightId`, `fromDestination`, `toDestination`, `noOfSeats`, `date`,`flightName`) VALUES (?, ?, ?, ?, ?, ?,?)";
    const qUpdateSeats = "UPDATE flights SET noOfSeats = ? WHERE flightId = ?";

    const valuesCheckSeats = [req.body.flightId];

    db.query(qCheckSeats, valuesCheckSeats, (err, seatData) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        if (seatData.length === 0 || seatData[0].noOfSeats < req.body.noOfSeats) {
            return res.status(400).json("Not enough seats available for booking.");
        }

        const updatedSeats = seatData[0].noOfSeats - req.body.noOfSeats;
        const valuesBookTicket = [
            req.body.userId,
            req.body.flightId,
            req.body.fromDestination,
            req.body.toDestination,
            req.body.noOfSeats,
            req.body.date,
            req.body.flightName
        ];

        const valuesUpdateSeats = [updatedSeats, req.body.flightId];

        db.query(qBookTicket, valuesBookTicket, (err, bookingData) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }


            db.query(qUpdateSeats, valuesUpdateSeats, (error, updateData) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json(error);
                }

                return res.status(200).json("Ticket booked successfully.");
            });
        });
    });
};





module.exports = { userRegister, userLogin, searchFlightsByDate, bookTicket, searchFlights }