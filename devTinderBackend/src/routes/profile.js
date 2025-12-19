const express = require("express");
const {
    userAuth
} = require("../middlewares/auth");
const {
    validateEditProfileData
} = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request!");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.status(200).json({
            message: `${loggedInUser.firstName}, your profile updated successfully.`,
            data: loggedInUser,
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/forgotPassword", async (req, res) => {
    // get the 
    res.send("Patch password");
});

module.exports = profileRouter;