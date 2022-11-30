const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//import validation
const { registerValidation,updateValidation } = require('../configs/validation')

// import models
const Admin = require('../models/Admin')
const User = require('../models/User')
const verifyAdmin = require('./verifyAdmin')

// Register
router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body)
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    // if email exist
    const emailExist = await Admin.findOne({email: req.body.email})
    if(emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Sudah digunakan !'
    })
    
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const admin = new Admin({
        nama: req.body.nama,
        email: req.body.email,
        password: hashPassword
    })

    //create admin
    try {
        const saveAdmin = await admin.save()
        res.json(saveAdmin)
    }catch(err){
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal Membuat admin baru'
        })
    
    }
})


// Login 
router.post('/login', async (req, res) => {

    // if email exist
    const admin = await Admin.findOne({email: req.body.email})
    if(!admin) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Anda Salah!'
    })

    // check password
    const validPwd = await bcrypt.compare(req.body.password, admin.password)
    if(!validPwd) return res.status(400).json({
        status: res.statusCode,
        message: 'Password Anda Salah!'
    })

    // membuat token menggunkan JWT
    const token = jwt.sign({ _id: admin._id }, process.env.SECRET_KEY2)
    res.header('authadmin', token).json({
        id:admin._id,
        token: token
    })
}),

// get admin by id
router.get('/:id',verifyAdmin, async (req,res)=>{
    const admin = await Admin.findById(req.params.id)
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
            message:"Admin tidak ditemukan!"
        });
    })
})

// Update data admin
router.put('/:id',verifyAdmin, async (req, res) => {
    try{
        const { error } = updateValidation(req.body);
        if(error) return res.status(400).json({
            status: res.statusCode,
            message: error.details[0].message
        })

        const dataLama = await Admin.findById(req.params.id);

        
        const checkValid = await bcrypt.compare(req.body.password, dataLama.password);
        if(checkValid){
            const salt = await bcrypt.genSalt(10);
            const newHash = await bcrypt.hash(req.body.newPassword, salt);

            await Admin.findByIdAndUpdate(req.params.id,{
                nama:req.body.nama,
                password:newHash
            })
            .then(ress=>{
                res.status(200).json({
                    status:res.statusCode,
                    message:{
                        nama:req.body.nama,
                        password:newHash
                    }
                });
            })
            .catch(err=>{
                res.status(400).json({
                    status:res.statusCode,
                    message:"data gagal diganti!"
                });
            })
        }else{
            res.status(400).json({
                status:res.statusCode,
                message:"Password tidak sesuai!"
            });
        }
    }catch(err){
        res.status(400).send({message: err})
    }
})

// Delete Admin by admin id
router.delete('/deleteAdmin/:id', verifyAdmin, async (req,res) => {
    try {
        const deleteAdmin = await Admin.deleteOne({_id: req.params.id})
        if(!deleteAdmin){
            res.send("Admin tidak ditemukan")
        } else {
            res.send("Admin berhasil dihapus")
        }
    } catch (error) {
        res.send(error)
    }
})

// Get All User by admin
router.get('/getAllUser', verifyAdmin, async (req,res) => {
    try {
        const getAllUser = await User.find()
        res.json(getAllUser)
    } catch (error) {
        res.send(error)
    }
})

// Update user by admin
router.put('/updateUser/:id',verifyAdmin, async (req, res) => {
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

// Delete user by admin
router.delete('/deleteUser/:id', verifyAdmin, async (req,res) => {
    try {
        const deleteUser = await User.deleteOne({_id: req.params.id})
        if(!deleteUser){
            res.send("User tidak ditemukan")
        } else {
            res.send("User berhasil dihapus")
        }
    } catch (error) {
        res.send(error)
    }
})



module.exports = router