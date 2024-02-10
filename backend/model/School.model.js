const mongoose = require('mongoose');
const StudentModel = require('./Student.model');
const TeacherModel = require('./Teacher.model');
const { Schema } = mongoose;

const SchoolSchema = new Schema({
  name: String,
  city : String,
  students : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'student'
  }],
  teachers :  [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'teacher'
  }],

});



module.exports = mongoose.model('School',SchoolSchema)