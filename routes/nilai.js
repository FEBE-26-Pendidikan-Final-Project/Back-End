const express = require('express')
const router = express.Router()
const Nilai = require('../models/Nilai')

const quizConnection = require('./quiz')
const verifyToken = require('./verifyToken')

// CREATE
router.post('/', quizConnection, async (req, res)=> {
    
})