const { type } = require('@hapi/joi/lib/extend')
const mongoose = require('mongoose')

const kelasSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    guru: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required : true
    },
    tglTerdaftar: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Kelas', kelasSchema)