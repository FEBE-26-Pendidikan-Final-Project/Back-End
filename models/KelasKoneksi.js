const mongoose = require('mongoose')

const kelasKoneksiSchema = mongoose.Schema({
    admin: {
        type: mongoose.ObjectId,
        ref: "Admin"
    },
    kelas: {
        type: mongoose.ObjectId,
        ref: "Kelas"
    }
})

module.exports = mongoose.model('KelasKoneksi', kelasKoneksiSchema)