const mongoose = require('mongoose')
const { Schema } = mongoose;


const StudentSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    seat_no : {
        type: Number,
        required: true,
        unique: true
    },
    school : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School"
    },
    marks : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'marks'
    }
});


module.exports = mongoose.model('student', StudentSchema)