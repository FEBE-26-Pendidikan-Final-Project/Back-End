const e = require('express')
const express = require('express')
const router = express.Router()

const mongoose = require("mongoose")
const KelasTaken = require('../models/KelasTaken')
const Kelas = require('../models/Kelas')
const Quiz = require('../models/Quiz')
const Nilai = require('../models/Nilai')

const verifyAdmin = require('./verifyAdmin')
const verifyToken = require('./verifyToken')


// CREATE
router.post('/',verifyAdmin, async (req, res) => {
    const kelasPost = new Kelas({
        nama: req.body.nama,
        ket: req.body.ket,
        admin: req.body.admin,
    })

    try {
        const kelas = await kelasPost.save()
        res.json(kelas)
    }catch(err){
        res.json({message: err})
    }
}),

// get all kelas
router.get('/', async (req, res) => {
    try {
        const kelas  = await Kelas.find()
        res.json(kelas)
    }catch(err){
        res.json({message: err})
    }
}),

//get kelas by kelas id
router.get('/:id', async (req, res) => {
    const kelas = await Kelas.findById(req.params.id)
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "Kelas berhasil ditemukan"});
    })

  }),

//get Admin semua kelas yang dibuat admin/guru
  router.get('/Admin/:id',  async (req, res) => {
    const kelas = await Kelas.find({
        "admin": req.params.id
      })
    .populate('kelas')
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "kelas berhasil ditemukan"});
    })

  }),
    
// UPDATE
router.put('/:id',verifyAdmin, async (req, res) => {
    try{
        const kelasUpdate = await Kelas.updateOne({_id: req.params.id}, {
            nama: req.body.nama,
            ket: req.body.ket
        })
        if(!kelasUpdate) {
            res.status(400).json("cek error")
        } else {
            const kelas = await Kelas.findById(req.params.id)
            res.json(kelas)
        }
    }catch(err){
        res.status(400).send({message: err})
    }
}),

// DELETE kelas by id
router.delete('/:id',verifyAdmin, async (req, res) => {
    try{
        const kelas = await Kelas.deleteOne({_id: req.params.id})
        if(kelas){
            res.json({message:"Kelas berhasil dihapus"})
            const getQuiz = await Quiz.findOne({kelas:req.params.id});
            const quizID = getQuiz._id;
            const hapusQuiz = await Quiz.deleteMany({kelas:req.params.id})
            .then(resHapus =>{
                if(resHapus){
                    console.log("Berhasil dihapus quiz!");
                }else{
                    console.log("Gagal dihapus!");
                }
            })
            .catch(err =>{
                console.log(err);
            })

            const hapusKelasTaken = await KelasTaken.deleteMany({kelas:req.params.id})
                    .then(resHapuss =>{
                        if(resHapuss){
                            console.log("Berhasil dihapus kelas taken!");
                        }else{
                            console.log("Gagal dihapus!");
                        }
                    })
                    .catch(errr =>{
                        console.log(errr);
                    })


            const hapusNilai = await Nilai.deleteMany({quiz:quizID})
                    .then(resHapuss =>{
                        if(resHapuss){
                            console.log("Berhasil dihapus nilai!");
                        }else{
                            console.log("Gagal dihapus!");
                        }
                    })
                    .catch(errr =>{
                        console.log(errr);
                    })
        }else{
            res.json({message:"Kelas gagal dihapus"})
        }
    }catch(err){
        res.json({message: err})
    }
})




module.exports = router
