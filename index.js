const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const colors = require("colors");
// const cors = require("cors");

const app = require("./app")

// database connection
// DBConnect(); initial code----

// mongoose.connect('mongodb://localhost:27017/').then(() => {
mongoose.connect(process.env.DB_ATLAS).then(() => {
    console.log("Database Connection successfully established".red.bold);
});



// ---------- Server PORT ----------
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("EduMate server Running...");
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});

