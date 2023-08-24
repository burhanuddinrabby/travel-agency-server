const express = require('express')
const router = express()
const bcrypt = require('bcrypt')
const { upload } = require('../../Middleware/multer')
const loginModel = require('../../../Models/login.model')
const registerModel = require('../../../Models/register.model')


router.post("/login", upload.none(), async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await registerModel.findOne({ email }, ["name", "password"]);
        if (user) {
            const { name } = user;
            const hashedPassword = user.password;
            const check_validation = await bcrypt.compare(password, hashedPassword);
            if (check_validation) {
                const newUser = {
                    name,
                    email
                }
                res.status(200).json({ status: 200, newUser })
            }
            else {
                res.status(400).json({ status: 400, message: "Invalid password" })
            }
        } else {
            res.status(400).json({ status: 400, message: "User not found" })
        }

    } catch (e) {
        res.status(400).json({ status: 400, message: e.message })
    }
})

module.exports = router