const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    identify: {
        required: true,
        type: Number,
        enum: [0, 1]
    },
    userid: {
        required: true,
        type: String
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    phoneNumber: {
        required: true,
        type: String
    },
    IDCardNumber: {
        required: true,
        type: String
    },
    enterDate: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        required: true
    },
    nation: {
        type: String,
    },
    native: {
        type: String,
    },
    person: {
        type: String,
        required: true
    },
    cardtype: {
        type: String,
        required: true
    },
    political: {
        type: String,
    },
    borndate: {
        type: Date,
        required: true
    }
})
const User = mongoose.model('User', UserSchema);
module.exports = User;