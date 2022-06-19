const mongoose = require('mongoose')

const ProblemsSchema = new mongoose.Schema({
    problem: {
        type: String,
        required: true,
    },
    pattern: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Problems', ProblemsSchema)