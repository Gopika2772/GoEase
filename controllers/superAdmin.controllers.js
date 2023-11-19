const db = require("../db");
const bcrypt = require("bcrypt");


const superAdminRegister = (req, res) => {
    var q = "SELECT * FROM superadmin WHERE email = ? OR superAdminName = ?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Super Admin already exists!");


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        q = "INSERT INTO superadmin(`superAdminName`,`email`,`password`) VALUES (?)";
        const values = [req.body.superAdminName, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Super Admin has been created.");
        });
    });
}
const superAdminLogin = (req, res) => {
    const query = "SELECT * FROM  superadmin WHERE email=? "
    db.query(q, [req.body.superAdminName], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Super Admin not found!");


        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password!");
    });
};



const addAdmin = (req, res) => {

    const q =
        "INSERT INTO admin(`adminName`,`email`,`password`) VALUES (?)";

    const values = [
        req.body.adminName,
        req.body.email,
        req.body.password,
    ];
    db.query(q, [values], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        } else {
            return res.json("admin added");
        }
    });
};

const updateAdmin = (req, res) => {

    const q =
        "UPDATE admin SET `adminId`=?,`adminName`=?,`email`=?,`password`=?";

    const values = [req.body.adminId, req.body.adminName, req.body.email, req.body.password];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Admin details updated.");
    });
};

const deleteAdmin = (req, res) => {
    const q = "DELETE FROM admin WHERE `adminId` = ?";

    db.query(q, [req.body.adminId], (err, data) => {
        if (err) return res.status(403).json("Admin not deleted");

        return res.json("Admin deleted");
    });

};


module.exports = { superAdminRegister, superAdminLogin, addAdmin, updateAdmin, deleteAdmin }