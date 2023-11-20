
const express = require("express");
const { adminLogin, adminRegister,addFlight,viewBookings } = require("../controllers/admin.auth.contollers");
// const { userLogin, userRegister } = require("../controllers/user.auth.contollers");


const router = express.Router();


router.get("/adminlogin", adminLogin);
router.post("/adminregister", adminRegister);
router.post("/addflight", addFlight);
router.get("/view", viewBookings);



module.exports = router;