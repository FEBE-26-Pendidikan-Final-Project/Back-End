const express = require('express')
const router = express.Router()
const KelasTaken = require('../models/KelasTaken')
const Kelas = require('../models/Kelas')

const verifyToken = require('./verifyToken')
const verifyAdmin = require('./verifyAdmin')

// CREATE Kelas taken
router.post('/', async (req, res) => {
    const kelasTakenPost = new KelasTaken({
        user: req.body.user,
        kelas: req.body.kelas
    })

    
    try {
        const kelasTaken = await kelasTakenPost.save()
        res.json(kelasTaken)
    }catch(error){
        //jika kelas not found
        const kelas = await Kelas.findOne({kelas: req.body.kelas})
        if(!kelas) return res.status(400).json({message: 'kelas Yang Anda Inputkan Salah!'})
    }
}),

// READ
router.get('/', async (req, res) => {
    try {
        const kelasTaken  = await KelasTaken.find()
        res.json(kelasTaken)
    }catch(err){
        res.json({message: err})
    }
}),


//get semua user by kelasid
router.get('/kelas/:id', async (req, res) => {
    const kelasTaken = await KelasTaken.find({
        "kelas": req.params.id
      })
    .populate('user')
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "Kelas yang diambil berhasil ditemukan"});
    })

  }),
//get semua kelas by userid
  router.get('/user/:id', async (req, res) => {
    const kelasTaken = await KelasTaken.find({
        "user": req.params.id
      })
    .populate('kelas')
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "user berhasil ditemukan"});
    })

  }),


// UPDATE kelas taken by admin
router.put('/:id',verifyAdmin, async (req, res) => {
    try{
        const kelasTakenUpdate = await KelasTaken.updateOne({_id: req.params.id}, {
            user: req.body.user,
            kelas: req.body.kelas
        })
        if(!kelasTakenUpdate) {
            res.status(400).json("cek error")
        } else {
            const kelasTaken = await KelasTaken.findById(req.params.id)
            res.json(kelasTaken)
        }
        
    }catch(err){
        res.json({message: err})
    }
}),

// DELETE kelas taken by admin
router.delete('/Admin/:id',verifyAdmin, async (req, res) => {
    try{
        const kelasTakenUpdate = await KelasTaken.deleteOne({_id: req.params.id})
        res.json(kelasTakenUpdate, "Kelas yang diambil berhasil dihapus")
    }catch(err){
        res.json({message: err})
    }
})

// Delete kelas taken by user
router.delete('/:id', verifyToken, async (req, res)=> {
    try {
        res.send("cek route delete kelas taken by user")
    } catch (error) {
        res.send(error)
    }
})


module.exports = router
