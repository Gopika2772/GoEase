const express = require("express");
const { userLogin ,userRegister,searchFlightsByDate,bookTicket,searchFlights} = require("../controllers/user.auth.contollers");

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/searchFlightsByDate", searchFlightsByDate);
router.get("/searchFlights", searchFlights);
router.post("/bookTicket", bookTicket);

module.exports = router;