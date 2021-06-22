const mongoose = require('mongoose');
const informationSchema = new mongoose.Schema({
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
    phoneNumber: {
        required: true,
        type: String
    },
    projects: {
        required: true,
        type: String
    },
    littles: {
        required: true,
        type: String
    },
    detial: {
        type: String
    },
    imgpath: {
        type: String
    },
    infordate: {
        type: String,
    },
    adminflag: {
        type: Number,
        default: 0,
        enum: [0, 1, 2]
    },
    userflag: {
        type: Number,
        default: 0,
        enum: [0, 1]
    },
    dorm: {
        type: String,
    }
})
const Information = mongoose.model('Information', informationSchema);
module.exports = Information;