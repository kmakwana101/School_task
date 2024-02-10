const mongoose = require('mongoose')
const { Schema } = mongoose;

const marksSchema = new Schema({
  maths : Number, 
  science : Number, 
  english : Number,
  physics : Number, 
  student : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'student'
  }
});


module.exports = mongoose.model('marks',marksSchema)