const express = require('express')
const router = express.Router()
const Nilai = require('../models/Nilai')

const verifyAdmin = require('./verifyAdmin')
const verifyToken = require('./verifyToken')


// CREATE nilai
router.post('/',verifyToken, async (req, res) => {
    const nilaiPost = new Nilai({
        skor: req.body.skor,
        user : req.body.user,
        quiz : req.body.quiz
    })

    try {
        const nilai = await nilaiPost.save()
        res.json(nilai)
    }catch(err){
        res.json({message: err})
    }
}),

// Get all nilai
router.get('/', async (req, res) => {
    try {
        const nilai  = await Nilai.find()
        res.json(nilai)
    }catch(err){
        res.json({message: err})
    }
}),


//get nilai by Id
router.get('/:id', async (req, res) => {
    const nilai = await Nilai.findById(req.params.id)
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "nilai has been found"});
    })

}),


//get semua nilai by userid
  router.get('/user/:id', async (req, res) => {
    const nilai = await Nilai.find({
        "user": req.params.id
      })
    .populate('quiz')
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "user berhasil ditemukan"});
    })

  }),
  //get semua nilai by quiz id
  router.get('/quiz/:id', async (req, res) => {
    const kelasTaken = await kelasTaken.find({
        "quiz": req.params.id
      })
    .populate('user')
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "user berhasil ditemukan"});
    })

  }),

// UPDATE
router.put('/:id',verifyAdmin, async (req, res) => {
    try{
        const nilaiUpdate = await Nilai.updateOne({_id: req.params.id}, {
            skor: req.body.skor,
        })
        if(!nilaiUpdate) {
            res.status(400).json(error)
        } else {
            const nilai = await Nilai.findById(req.params.id)
            res.json(nilai)
        }
    }catch(err){
        res.json({message: err})
    }
}),

// DELETE nilai by admin
router.delete('/:id',verifyAdmin, async (req, res) => {
    try{
        const nilai = await Nilai.deleteOne({_id: req.params.id})
        res.json({message: "nilai has been deleted"})
    }catch(err){
        res.json({message: err})
    }
})

module.exports = router
