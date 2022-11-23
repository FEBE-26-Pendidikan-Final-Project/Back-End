const { string } = require('joi')
const mongoose = require('mongoose')

const nilaiSchema = mongoose.Schema({
    bacaan: {
        type: String,
        required: true,
        max: 500
    },
    soal: {
        type: String,
        required: true,
        max: 500
    },
    jawaban: {
        type: String,
        required: true,
        max: 200
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Nilai', nilaiSchema)