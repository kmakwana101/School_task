const SchoolModel = require("../model/School.model")
const TeacherModel = require("../model/Teacher.model")

exports.add = async (req, res) => {
    try {
        
        //school === school_ID

        const { name, school } = req.body

        if (!name || !school) throw new Error('please enter valid Fields')

        const data = await TeacherModel.create(req.body)

        await SchoolModel.findByIdAndUpdate(
            school,
            { $push: { teachers: data._id } },
            { new: true }
        );

        res.status(200).json({
            message: 'ok',
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

exports.show = async (req, res) => {
    try {
        let data;

        if (req.query.id) {
            data = await TeacherModel.findById(req.query.id)
        } else {
            data = await TeacherModel.find()
            if (!data || !data.length) throw new Error('Data Not Found')
        }

        res.status(200).json({
            message: 'data',
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

        let data = await TeacherModel.findByIdAndUpdate(req.query.id, {
            $set: req.body
        })

        // const updatedSchool = await schoolModel.updateOne(
        //     { _id : student?.school },
        //     { $pull: { students: req.query.id} }
        // );

        if (!data || data === null) throw new Error('Data Not Found')

        await SchoolModel.findByIdAndUpdate(
            data?.school,
            { $addToSet: { teachers: data._id } }, // Use $addToSet to avoid duplicates
            { new: true }
        );

        res.status(200).json({
            message: 'Updated Data',
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


exports.delete = async (req, res) => {
    try {
        if (!req.query.id) throw new Error('please enter id')

        const teacher = await TeacherModel.findByIdAndDelete(req.query.id)
        console.log(teacher)

        const data = await SchoolModel.updateOne(
            { _id: teacher.school },
            { $pull: { teachers : teacher._id } }
        );

        if (!data) throw new Error('Please Enter Valid ID')

        res.status(200).json({
            message: 'delete teacher',
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