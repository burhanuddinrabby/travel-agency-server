const express = require('express')
const mongoose = require('mongoose')
const router = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')

router.use(express.json())
router.use(cors())
require('dotenv').config()

const PORT = process.env.PORT || 3000
const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rwssesm.mongodb.net/`);
        console.log("Connected to mongoDB.");
    } catch (error) {
        console.log(error);
    }
};
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

router.get('/api', async (req, res) => {
    console.log('This is Testing api');
    res.json('This is Testing api');
})
router.listen(PORT, () => {
    connect();
    console.log(`We are is listening to port -> ${PORT}`)
})

// public routes
const load_route = require("./api/load-data")
const register = require("./api/private/auth/register")
const login = require("./api/private/auth/login")
router.use("/api/route/", load_route);
router.use("/api/route/", register);
router.use("/api/route/", login);
