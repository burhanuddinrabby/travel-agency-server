const mongoose = require('mongoose');
const schema = mongoose.Schema;

const loginSchema = new schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const loginModel = mongoose.model('login', loginSchema);

module.exports = loginModel;