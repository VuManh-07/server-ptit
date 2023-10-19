const mongoose = require('mongoose');  

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    publicKey: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    uni: {
        type: String,
        default: "HVCNBCVT"
    },
    class: {
        type: String,
        required: true,
    },
    major:{
        type: String,
        required: true,
    },
    birth: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: ""
    }
})

module.exports =  mongoose.model('User', UserSchema);