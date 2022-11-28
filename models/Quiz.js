const { array } = require('joi')
const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
    kelas: {
        type: mongoose.ObjectId,
        ref: "Kelas"
    },
    nama: {
        type: String,
        required: true
    },
    bacaan: {
        type: String,
        required: true
    },
    soal: {
        question:{
            type:String,
            required:true
        },
        answer:[
            {
                type:String,
                required:true
            },
            {
                type:String,
                required:true
            },
            {
                type:String,
                required:true
            },
            {
                type:String,
                required:true
            }
        ],
        correctAnswer:{
            type:Number,
            required:true
        }
    }
    // option untuk jawaban yang benar dari setiap pertanyaan
    // option: {
    //     type: Array,
    //     default:[]
    // }
})

module.exports = mongoose.model('Quiz', quizSchema)
