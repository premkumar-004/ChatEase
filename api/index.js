const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to DB'));



app.get("/test", (req, res) => {
    res.json('test ok');
})

app.post("/register", (req, res) => {

})

app.listen(4000, (req, res) => {
    console.log('Server is running on port 4000');
});