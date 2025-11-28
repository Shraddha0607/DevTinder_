const express = require("express");

const app = express();

const {
    adminAuth,
    userAuth
} = require("./middlewares/auth");

app.use("/admin", adminAuth);
app.use ("/user", userAuth);

app.get("/admin/getAllData", (req, res) => {
    res.send("I am user");
});

app.delete("/admin/deleteAllData", (req, res, next) => {
    res.send("deletion by admin");
});

app.delete("/admin/user", (req, res, next) => {
    const token = "xyz";
    if (token === "xyz") {
        console.log("valid token");
        res.send("User deleted successfully!");
    } else {
        res.status(401).send("Unauthorized request");
    }
});

app.get("/user", (req, res, next) => {
        console.log("Handling the route user!!");
        res.send("Response!!");
    }
);

app.listen(3000, () => {
    console.log("Server is successfully listening on port 2000");
});