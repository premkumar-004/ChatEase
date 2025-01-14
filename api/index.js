const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to DB'));

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));

app.get("/test", (req, res) => {
    res.json('test ok');
})

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) throw err;
        res.json(userData);
    })
})

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const createdUser = await User.create({ username, password })
        jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json({
                id: createdUser._id,
            });
        })
    } catch (err) {
        if (err) throw err;
        res.status(500).json("error");
    }
})

app.listen(4000, (req, res) => {
    console.log('Server is running on port 4000');
});