const mongoose = require('mongoose');  

mongoose.Promise = global.Promise;

const BangDiemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    code: {
        type: String,
        required: true,
    },
    diem: { type: Array} 
})

module.exports =  mongoose.model('BangDiem', BangDiemSchema);