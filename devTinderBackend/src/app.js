
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});
const express = require("express");
const connectDb = require('./config/database');
const User = require('./models/user');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const {
    validateSignUpData
} = require("./utils/validation");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        // validation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // creating a new instance of the User model
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });


        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({emailId: emailId});

        if (!user) {
            throw new Error("Invalid credential!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.status(200).json({ message: "Login successful."});
        }
        else {
            throw new Error ("Invalid credential!");
        }

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

// Get user by ID
app.get('/userById', async (req, res) => {
    const userId = req.body.userId;
    try {
        console.log(userId);
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).send("User not found!");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
});

// Get user by email
app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const user = await User.findOne({
            emailId: userEmail
        });
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send(user);

        }

        // const users = await User.find({ emailId : userEmail });
        // if (users.length === 0) {
        //     res.status(404).send("User not found");
        // }
        // else {
        //     console.log("Users" + users);
        //     res.send(users);
        // }
    } catch (err) {
        res.status(400).send("Something went wrong.");
    }
});

// Feed API - Get /feed - get all users from the database
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
});

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({
            message: "User id is required."
        });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: "Invalid userId format"
        });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(400).json({
                message: "User not found."
            });
        }
        res.status(200).json({
            message: "User deleted successfully."
        });
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
});

app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const userData = req.body;

    if (!userId) {
        return res.status(400).json({
            message: "User Id is required."
        });
    }

    try {
        const ALLOWED_UPDATES = [
            "userId",
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills",
        ];
        const isUpdateAllowed = Object.keys(userData).every(key =>
            ALLOWED_UPDATES.includes(key)
        );
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed.");
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId, {
                $set: userData
            }, {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedUser) {
            res.status(404).json({
                message: "User not found!"
            });
        }

        res.status(200).json({
            message: "User data is updated successfully."
        });
    } catch (err) {
        res.status(400).json({
            message: "Update failed! " + err.message
        });
    }
});

connectDb()
    .then(() => {
        console.log("Database connection established.");
        app.listen(process.env.PORT, () => {
            console.log("Server is successfully listening on port 3000");
        });
    })
    .catch((err) => {
        console.error("Database cannot connected." + err.message)
    });