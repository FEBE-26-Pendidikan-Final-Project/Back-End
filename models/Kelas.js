const { type } = require('@hapi/joi/lib/extend')
const mongoose = require('mongoose')

const kelasSchema = mongoose.Schema({
    
    nama: {
        type: String,
        required: true
    },
    ket: {
        type: String,
        required : true
    },
    admin: {
        type: mongoose.ObjectId,
        ref: "Admin"
    },
    tglTerdaftar: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Kelas', kelasSchema)
