
const express = require("express");
const {  adminRegister,addFlight,viewBookings, adminLogin } = require("../controllers/admin.auth.contollers");
// const { userLogin, userRegister } = require("../controllers/user.auth.contollers");


const router = express.Router();


// router.post("/adminlogin", adminLogin);
router.post("/alogin",adminLogin)
router.post("/adminregister", adminRegister);
router.post("/addflight", addFlight);
router.get("/view/:flightNameFilter", viewBookings);



module.exports = router;