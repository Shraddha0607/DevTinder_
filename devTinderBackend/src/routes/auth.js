const express = require("express");
const bcrypt = require("bcrypt");
const {
    validateSignUpData
} = require("../utils/validation");
const User = require("../models/user");


const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        // validation of data
        validateSignUpData(req);

        const {
            firstName,
            lastName,
            emailId,
            password
        } = req.body;

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        const savedUser = await user.save();
        const token = await savedUser.getJWT();
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 360000)
        });

        res.status(200).json({
            message: "User added successfully",
            data: savedUser
        });
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const {
            emailId,
            password
        } = req.body;

        const user = await User.findOne({
            emailId: emailId
        });

        if (!user) {
            throw new Error("Invalid credential!");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT(); // offloaded JWT token by schema method

            res.cookie("token", token, {
                httpOnly: true, // JS cannot access (security)
                secure: true, // REQUIRED for HTTPS (Vercel)
                sameSite: "none", // REQUIRED for cross-origin
                expires: new Date(Date.now() + 8 * 3600000)
            });
            res.status(200).json({
                message: "Login successful.",
                data: user
            });
        } else {
            throw new Error("Invalid credential!");
        }

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    // 
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.status(200).json({
        messsage: "Logout Successful."
    });
});

module.exports = authRouter;