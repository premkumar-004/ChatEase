const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const ws = require("ws");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to DB'));

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(cookieParser());

app.get("/test", (req, res) => {
    res.json('test ok');
})

app.get("/profile", (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) throw err;
            res.json(userData);
        })
    } else {
        res.status(401).json('no token');
    }
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (foundUser) {
        const passOk = bcrypt.compareSync(password, foundUser.password);
        if (passOk) {
            jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { sameSite: 'none', secure: 'true' }).status(201).json({
                    id: foundUser._id,
                });
            })
        }
    }
})

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({
            username: username,
            password: hashedPassword,
        })
        jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { sameSite: 'none', secure: 'true' }).status(201).json({
                id: createdUser._id,
            });
        })
    } catch (err) {
        if (err) throw err;
        res.status(500).json("error");
    }
})



const server = app.listen(4000, (req, res) => {
    console.log('Server is running on port 4000');
});

//WebSocket Sever
const wss = new ws.WebSocketServer({ server });
wss.on('connection', (connection, req) => {
    const cookies = req.headers.cookie;
    if (cookies) {
        const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
        // console.log(tokenCookieString);
        if (tokenCookieString) {
            const token = tokenCookieString.split('=')[1];
            // console.log(token);
            if (token) {
                jwt.verify(token, jwtSecret, {}, (err, userData) => {
                    if (err) throw err;
                    const { userId, username } = userData;
                    connection.userId = userId;
                    connection.username = username;
                })
            }
        }
    }
    [...wss.clients].forEach(client => {
        client.send(JSON.stringify({
            online: [...wss.clients].map(c => ({ userId: c.userId, username: c.username })),
        }))
    })
})