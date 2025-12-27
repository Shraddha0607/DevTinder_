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
    process.env.NODE_ENV === "production" ? [process.env.FRONTEND_LIVE] : ["http://localhost:5173"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // allow server-to-server or Postman
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(null, false); // <-- do NOT throw an Error, just deny
    },
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
    console.log("Allowed Origins:", allowedOrigins);
    console.log("Env:", process.env);
    res.send(`You are good ${JSON.stringify(allowedOrigins)} process end ${JSON.stringify(process.env)}`);
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