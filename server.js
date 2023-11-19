const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const AdminRouter = require("./routes/admin.rotes");
const UserRouter = require("./routes/user.routes");
const SuperAdminRouter = require("./routes/superAdmin.routes");
const db = require('./db')
db.connect((err) => {
    if (err) {
        console.log("db not connected");
    }
    else {
        console.log("mysql connected");
    }
})



const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/", AdminRouter);
app.use("/", SuperAdminRouter);
app.use("/", UserRouter);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})