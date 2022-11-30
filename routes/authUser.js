const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//import validation
const { registerValidation } = require('../configs/validation')

// import models
const User = require('../models/User')
const verifyToken = require('./verifyToken')

// Register
router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    // if email exist
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Sudah digunakan !'
    })
    
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        nama: req.body.nama,
        email: req.body.email,
        password: hashPassword
    })

    //create user
    try {
        const saveUser = await user.save()
        res.json(saveUser)
    }catch(err){
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal Membuat user baru'
        })
    
    }
})


// Login 
router.post('/login', async (req, res) => {

    // if email exist
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Anda Salah!'
    })

    // check password
    const validPwd = await bcrypt.compare(req.body.password, user.password)
    if(!validPwd) return res.status(400).json({
        status: res.statusCode,
        message: 'Password Anda Salah!'
    })

    // membuat token menggunkan JWT
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
    res.header('authuser', token).json({
        id:user._id,
        token: token
    })
}),

// Update user by user
router.put('/:id',verifyToken, async (req, res) => {
    try{
        const userUpdate = await User.updateOne({_id: req.params.id}, {
            nama: req.body.nama
        })
        if(!userUpdate) {
            res.status(400).json("cek error")
        } else {
            const user = await User.findById(req.params.id)
            res.json(user)
        }
    }catch(err){
        res.status(400).send({message: err})
    }
})

// get user by id => saran nazar
router.get('/:id',verifyToken, async (req,res)=>{
    const user = await User.findById(req.params.id)
    .then(doc =>{
        if(doc){
            res.status(200).json({
                status:res.statusCode,
                message:{
                    nama: doc.nama,
                    email: doc.email
                }
            });
        }
    })
    .catch(err =>{
        res.status(404).json({
            status:res.statusCode,
            message:"user tidak ditemukan!"
        });
    })
})

//get id dari user by email address
// router.get('/id/', async (req, res) => {
//     const user = await User.find({
//         "email": req.body.email
//     },{_id:1})
//     res.json(user)
//     // .then( doc.email => {
//     //   if(!doc.email) {return res.status(404).end();}
//     //   return res.status(200).json({doc.email , message: "user berhasil ditemukan"});
//     // })

//   })



module.exports = router
