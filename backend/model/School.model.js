const mongoose = require('mongoose')
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

SchoolSchema.pre('findOneAndDelete', async function(next) {
  const school = this;
  const studentIds = school.students;
  const teacherIds = school.teachers;

  try {
    
    await StudentModel.deleteMany({ _id: { $in: studentIds } });
    await TeacherModel.deleteMany({ _id: { $in: teacherIds } });

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('School',SchoolSchema)