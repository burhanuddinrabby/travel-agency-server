const express = require('express')
const router = express()
const bcrypt = require('bcrypt')
const { upload } = require('../../Middleware/multer')
const registerModel = require('../../../Models/register.model')

router.post("/register", upload.none(), async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        const check = await registerModel.findOne({ email });
        if (check) {
            return res.status(400).json({ status: 400, result: "Email already exists.", user: check })
        } else {

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = {
                name,
                email,
                mobile,
                password: hashedPassword,
                createDate : new Date()
            }
            const result = await registerModel.create(user);
            res.status(200).json({
                status: 200,
                result
            })
        }
    }
    catch (e) {
        res.status(400).json({ status: 400, message: e.message })
    }
})

module.exports = router
