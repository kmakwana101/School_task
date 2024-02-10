const SchoolModel = require("../model/School.model")
const StudentModel = require("../model/Student.model")
const TeacherModel = require("../model/Teacher.model")

exports.add = async (req, res) => {
    try {
        const { name, city } = req.body

        if (!name || !city) throw new Error('please enter valid Fields')

        const data = await SchoolModel.create(req.body)

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
            data = await SchoolModel.findById(req.query.id)
        } else {
            data = await SchoolModel.find()
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

        let data = await SchoolModel.findByIdAndUpdate(req.query.id, {
            $set: req.body
        }, { new: true })

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
        if (!req.query.id) throw new Error('Please enter an ID');

        const school = await SchoolModel.findById(req.query.id);

        if (!school) throw new Error('School not found');

        await StudentModel.deleteMany({ _id: { $in: school.students } });

        // Delete associated teacher documents
        await TeacherModel.deleteMany({ _id: { $in: school.teachers } });

        // Delete the school document by ID
        const data = await SchoolModel.findByIdAndDelete(req.query.id);

        res.status(200).json({
            message: 'School and associated data deleted successfully',
            status: 'success',
            data
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 'fail'
        });
    }
};
