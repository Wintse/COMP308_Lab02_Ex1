const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Student = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true},
        address: { type: String, required: true},
        city: { type: String, required: true},
        time: { type: [String], required: true },
        studentNumber: { type: Number, required: false },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        program: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('students', Student)
