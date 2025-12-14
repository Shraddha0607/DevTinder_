require('dotenv').config({ 
    path: '.env',
});

const express = require("express");
const connectDb = require('./config/database');
const User = require('./models/user');

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    // creating a new instance of the User model
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error while saving user : " + err.message);
    }
});

// Get user by email
app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;
    console.log("Emial is " + userEmail);

    try{
        const user = await User.findOne({ emailId: userEmail });
        if (!user) {
            res.status(404).send("User not found");                  
        }else{
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