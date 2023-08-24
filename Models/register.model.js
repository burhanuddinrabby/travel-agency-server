const mongoose = require('mongoose');
const schema = mongoose.Schema;

const registerSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
    }

})

const registerModel = mongoose.model('register', registerSchema);

module.exports = registerModel;