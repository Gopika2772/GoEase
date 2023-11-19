
const { superAdminLogin, superAdminRegister, addAdmin, updateAdmin, deleteAdmin } = require("../controllers/superAdmin.controllers")
const express = require("express");
const router = express.Router();

router.post("/superadmin/register", superAdminRegister);
router.get("/superadmin/login", superAdminLogin);
router.post("/superadmin/add", addAdmin);
router.put("/superadmin/update", updateAdmin);
router.delete("/superadmin/delete", deleteAdmin);

module.exports = router;