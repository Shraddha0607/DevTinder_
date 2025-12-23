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

const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require('./routes/user');

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