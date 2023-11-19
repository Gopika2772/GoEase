
const express = require("express");
const { register, login,addFlight,viewBookings } = require("../controllers/admin.auth.contollers");
const { userLogin, userRegister } = require("../controllers/user.auth.contollers");


const router = express.Router();


router.get("/login", userLogin);
router.post("/register", userRegister);
router.post("/addflight", addFlight);
router.get("/view", viewBookings);



module.exports = router;