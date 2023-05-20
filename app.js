const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

const signUpRouter = require("./routes/user.route")


// middleware
app.use(express.json());
app.use(cors());

app.use("/api/signup",signUpRouter)



// ---------- Happy Server ----------
app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});



module.exports = app;