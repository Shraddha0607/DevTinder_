const express = require("express");

const app = express();

const auth = (req, res, next) => {
    if (1 === 2) {
        console.log("You are admin and authorized")
        next();
    } else {
        res.status(401).send("Unauthorized request");
    }
};

app.get("/test", (req, res, next) => {
        console.log("I am test part");
        throw new Error("Error in test api");
        res.send("I am tdest");
    }
);

// app.use("/", (err, req, res, next) => {
//     if (err) {
//         res.status(500).send("Something went wrong!");
//     };
// });

app.use("/getUserData", (req, res) => {
    try {
        throw new Error("ghj");
        res.send("Hello ji");
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }

});

app.listen(4000, () => {
    console.log("server is started on 4000 port");
});