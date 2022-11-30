const { string } = require('joi')
const mongoose = require('mongoose')

const nilaiSchema = mongoose.Schema({
    skor: {
        type: String,
        required: true,
        max: 4
    },
    user: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    quiz: {
        type: mongoose.ObjectId,
        ref: "Quiz"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Nilai', nilaiSchema)