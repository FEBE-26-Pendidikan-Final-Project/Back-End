const express = require('express')
const router = express.Router()
const Kelas = require('../models/Kelas')

const verifyAdmin = require('./verifyAdmin')
const verifyToken = require('./verifyToken')


// CREATE
router.post('/',verifyAdmin, async (req, res) => {
    const kelasPost = new Kelas({
        nama: req.body.nama,
        guru: req.body.guru
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
      return res.status(200).json({doc , message: "kelas has been found"});
    })

  },

// UPDATE
router.put('/:id',verifyAdmin, async (req, res) => {
    try{
        const kelasUpdate = await Kelas.updateOne({_id: req.params.id}, {
            nama: req.body.nama,
            guru: req.body.guru
        })
        res.json(kelasUpdate)
    }catch(err){
        res.json({message: err})
    }
}),

// DELETE
router.delete('/:id',verifyAdmin, async (req, res) => {
    try{
        const kelasUpdate = await Kelas.deleteOne({_id: req.params.id})
        res.json(kelasUpdate)
    }catch(err){
        res.json({message: err})
    }
})
)
module.exports = router