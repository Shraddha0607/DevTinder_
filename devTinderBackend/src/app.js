const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send({
        firstName: "Shraddha",
        lastName: "Gaur"
    });
});

app.post("/user", (req, res) => {
    // saving data to DB
    res.send("Data successfully saved to the db");
});

app.delete("/user", (req, res) => {
    res.send("Deleted successfully!");
});

app.use("/test", (req, res) => {
    res.send("Hello, from tester")
});

app.use("/", (req, res) => {
    res.send("Namaste ji");
});

app.listen(3000, () => {
    console.log("Server is successfully listening on port 2000");
});