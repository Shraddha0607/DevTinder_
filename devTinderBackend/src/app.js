const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const express = require("express");
const connectDb = require('./config/database');
const User = require('./models/user');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const {
    userAuth
} = require("./middlewares/auth");

const {
    validateSignUpData
} = require("./utils/validation");
const cors = require("cors");
const app = express();

const allowedOrigins =
    process.env.NODE_ENV === "production" ? [process.env.FRONTEND_URL] : ["http://localhost:5173"];

console.log(allowedOrigins);
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require('./routes/user');

app.use('/check', (req, res) => {
    res.send(`You are good  ${allowedOrigins} process end ${process.env}`);
});

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);




connectDb()
    .then(() => {
        console.log("Database connection established.");
        app.listen(process.env.PORT, () => {
            console.log(`Server is successfully listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database cannot connected." + err.message)
    });