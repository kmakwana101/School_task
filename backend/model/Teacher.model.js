const mongoose = require('mongoose')
const { Schema } = mongoose;

const TeacherSchema = new Schema({
  name : String,
  school :  {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'student'
  },
});

module.exports = mongoose.model('teacher',TeacherSchema)