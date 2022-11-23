const express = require('express')
const router = express.Router()
const KelasTaken = require('../models/KelasTaken')

const verifyToken = require('./verifyToken')


// CREATE
router.post('/',verifyToken, async (req, res) => {
    const kelasTakenPost = new KelasTaken({
        user: req.body.user,
        kelas: req.body.alamat,
    })

    try {
        const kelasTaken = await kelasTakenPost.save()
        res.json(kelasTaken)
    }catch(err){
        res.json({message: err})
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

//get kelasTaken by id
router.get('/:id', async (req, res) => {
    const kelasTaken = await KelasTaken.findById(req.params.id)
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "kelas has been found"});
    })

  },

// UPDATE
router.put('/:ppdbId',verifyAdmin, async (req, res) => {
    try{
        const ppdbUpdate = await Ppdb.updateOne({_id: req.params.ppdbId}, {
            nama: req.body.nama,
            alamat: req.body.alamat
        })
        res.json(ppdbUpdate)
    }catch(err){
        res.json({message: err})
    }
}),

// DELETE
router.delete('/:ppdbId',verifyAdmin, async (req, res) => {
    try{
        const ppdbUpdate = await Ppdb.deleteOne({_id: req.params.ppdbId})
        res.json(ppdbUpdate)
    }catch(err){
        res.json({message: err})
    }
})
)
module.exports = router