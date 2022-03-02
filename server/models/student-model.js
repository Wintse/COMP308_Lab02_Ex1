const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Student = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        time: { type: [String], required: true },
        studentNumber: { type: Number, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('students', Student)
