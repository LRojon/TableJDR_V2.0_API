const express = require('express')
const router = express.Router()

const CreatureModel= require('../models/creatureModel')

router.get('/all', (req, res) => {
    CreatureModel.find({}, (err, docs) => {
        if(err) { console.log(err) }
        else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
            res.send(docs) 
        }
    })
})

router.post('/post/one', (req, res) => {
    CreatureModel.create(req.body, (err) => {
        if(err) { console.log(err) }
        else { 
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
            res.header("Content-Type: application/json")
            res.status(201).send('Created successfully.') 
        }
    })
})

module.exports = router