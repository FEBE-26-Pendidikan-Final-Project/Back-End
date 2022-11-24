const express = require('express')
const router = express.Router()
const KelasKoneksi = require('../models/KelasKoneksi')

const verifyToken = require('./verifyToken')
const verifyAdmin = require('./verifyAdmin')


// CREATE
router.post('/',verifyAdmin, async (req, res) => {
    const kelasKoneksiPost = new KelasKoneksi({
        admin: req.body.admin,
        kelas: req.body.kelas
    })

    try {
        const kelasKoneksi = await kelasKoneksiPost.save()
        res.json(kelasKoneksi)
    }catch(err){
        res.json({message: err})
    }
}),

// READ
router.get('/', async (req, res) => {
    try {
        const kelasKoneksi  = await KelasKoneksi.find()
        res.json(kelasKoneksi)
    }catch(err){
        res.json({message: err})
    }
}),

//get kelasTaken by id
router.get('/:id', async (req, res) => {
    const kelasKoneksi = await KelasKoneksi.findById(req.params.id)
    .then( doc => {
      if(!doc) {return res.status(404).end();}
      return res.status(200).json({doc , message: "kelas has been found"});
    })

  },

// UPDATE
router.put('/:id',verifyAdmin, async (req, res) => {
    try{
        const kelasKoneksiUpdate = await KelasKoneksi.updateOne({_id: req.params.id}, {
            nama: req.body.nama,
            alamat: req.body.alamat
        })
        res.json(kelasKoneksiUpdate)
    }catch(err){
        res.json({message: err})
    }
}),

// DELETE
router.delete('/:id',verifyAdmin, async (req, res) => {
    try{
        const kelasKoneksi = await KelasKoneksi.deleteOne({_id: req.params.ppdbId})
        res.json(kelasKoneksi)
    }catch(err){
        res.json({message: err})
    }
})
)
module.exports = router