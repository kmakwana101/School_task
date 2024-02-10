const SchoolModel = require("../model/School.model")

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
            if(!data || !data.length) throw new Error('Data Not Found')
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
        if (!req.query.id) throw new Error('please enter id')

        const data = await SchoolModel.findOneAndDelete({id : req.query.id})

        res.status(200).json({
            message: 'delete school and scholl all data',
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