const MarksModel = require("../model/Marks.model")
const StudentModel = require("../model/Student.model")
const schoolModel = require("../model/School.model")
const uuid = require('uuid');


exports.add = async (req, res) => {
    try {
        console.log(req.body)
        req.body.seat_no = Number(uuid.v4().replace(/\D/g, '').slice(0, 10))

        //school === school_ID

        const { name, school, maths, science, english, physics, seat_no } = req.body

        console.log(req.body)

        if (!name || !school || !maths || !science || !english || !physics || !seat_no) throw new Error('please enter valid Fields')

        const createMarks = await MarksModel.create({ maths, science, english, physics })
        console.log(createMarks)

        const data = await StudentModel.create({
            name,
            school,
            marks: createMarks?._id,
            seat_no
        })

        if (!data || !createMarks) throw new Error('Data Not Found')

        await MarksModel.findByIdAndUpdate(createMarks?._id, {
            student: data._id
        })

        await schoolModel.findByIdAndUpdate(
            school,
            { $push: { students: data._id } },
            { new: true }
        );

        res.status(200).json({
            message: 'Added data',
            status: 'success',
            data
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 'fail'
        })
    }
}

// exports.joindata = async (req, res) => {
//     try {
//         const studentsWithMarks = await StudentModel.aggregate([
//             {
//                 $lookup: {
//                     from: 'marks',
//                     localField: 'marks',
//                     foreignField: '_id',
//                     as: 'marks' 
//                 }
//             }
//         ]);

//         res.status(200).json({
//             message: 'Success',
//             studentsWithMarks
//         });
//     } catch (error) {
//         // Handle errors
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

exports.show = async (req, res) => {
    try {
        // console.log(req.body)
        let data, message;

        if (req.query.id) {

            data = await StudentModel.findById(req.query.id).populate('school').populate('marks')
            if (!data) throw new Error('please enter valid ID')
            message = "One Student Data"

        } else {

            data = await StudentModel.find().populate('school').populate('marks')
            if (!data || !data.length) throw new Error('Data Not Found')
            message = "All Student Data"

        }

        res.status(200).json({
            message,
            status: 'success',
            data
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 'fail'
        })
    }
}

exports.update = async (req, res) => {
    try {
        if (!req.query.id) throw new Error('please enter id')

        const { name, school, maths, science, english, physics, seat_no } = req.body;

        const student = await StudentModel.findById(req.query.id);

        if (!student) {
            throw new Error('Student not found.');
        }

        student.name = name;
        student.school = school;
        // student.seat_no = seat_no;  

        let marks = await MarksModel.findOne({ student: student._id });

        if (!marks) {
            marks = await MarksModel.create({ maths, science, english, physics, student: student._id });
        } else {
            marks.maths = maths;
            marks.science = science;
            marks.english = english;
            marks.physics = physics;
            await marks.save();
        }

        await student.save();

        await schoolModel.findByIdAndUpdate(
            school,
            { $addToSet: { students: student._id } }, // Use $addToSet to avoid duplicates
            { new: true }
        );

        res.status(200).json({
            message: 'updated data',
            status: 'success',
            data: student
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 'fail'
        })
    }
}


exports.delete = async (req, res) => {
    try {

        if (!req.query.id) throw new Error('please enter valid id')

        let student = await StudentModel.findById(req.query.id)

        if (!student) throw new Error('please enter valid id')

        await MarksModel.findByIdAndDelete(student?.marks)

        const updatedSchool = await schoolModel.updateOne(
            { _id: student?.school },
            { $pull: { students: req.query.id } }
        );

        let data = await StudentModel.findByIdAndDelete(req.query.id)

        if (!data) throw new Error('Not Valid Id')

        if (!updatedSchool) throw new Error('not valid id')

        res.status(200).json({
            message: 'deleted data',
            status: 'success',
            data
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 'fail'
        })
    }
}