const express = require('express')
const router = express.Router()
const KelasTaken = require('../models/KelasTaken')

const verifyToken = require('./verifyToken')
const verifyAdmin = require('./verifyAdmin')


// CREATE
router.post('/',verifyToken, async (req, res) => {
    const kelasTakenPost = new KelasTaken({
        user: req.body.user,
        kelas: req.body.kelas
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

// DELETE
router.delete('/:id',verifyAdmin, async (req, res) => {
    try{
        const kelasTakenUpdate = await KelasTaken.deleteOne({_id: req.params.id})
        res.json(kelasTakenUpdate)
    }catch(err){
        res.json({message: err})
    }
})
)
module.exports = router