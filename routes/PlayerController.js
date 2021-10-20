const express = require('express')
const router = express.Router()

const PlayerModel = require('../models/playerModel')

router.get('/get/all', (req, res) => { // Get All
    PlayerModel.find({}, (err, docs) => {
        if(err) { console.log(err) }
        else {
            res.send(docs) 
        }
    })
})

router.get('/get/all/name', (req, res) => { // Get All Names
    PlayerModel.find({}, (err, docs) => {
        if(err) { console.log(err) }
        else {
            let names = []
            docs.forEach(doc => {
                names.push(doc.name)
            })
            res.send(names)
        }
    })
})

router.get('/get/id/:id', (req, res) => {
    if(req.params.id.length != 24) { res.status(404).send('Wrong id') }
    PlayerModel.findOne({ _id: req.params.id }, (err, doc) => {
        if(err) { console.log(err) }
        else {
            if(doc != null) { res.send(doc) }
            else { 
                res.status(404)
                res.send('Wrong id') 
            }
        }
    })
})

router.get('/get/name/:name', (req, res) => {
    PlayerModel.findOne({ name: req.params.name }, (err, doc) => {
        if(err) { console.log(err) }
        else {
            if(doc != null) { res.send(doc) }
            else { res.status(404).send('Wrong name') }
        }
    })
})

router.post('/set/one', (req, res) => { // Create One / Update One
    PlayerModel.find({ name: req.body.name}, (err, docs) => {
        if(err) { console.log(err) }
        else {
            if(docs.length != 0) {
                PlayerModel.replaceOne({name: req.body.name}, req.body, (err, doc) => {
                    if(err) { console.log(err) }
                    else { res.status(200).send('Updated successfully.') }
                })
            }
            else {
                PlayerModel.create(req.body, (err) => {
                    if(err) { console.log(err) }
                    else {
                        res.status(201).send('Created successfully.') 
                    }
                })
            }
        }
    })
})

/*router.get('/del/one/:id', (req, res) => {
    if(req.params.id.length != 24) { res.send(404).send('Wrong id') }
    PlayerModel.deleteOne({_id: req.params.id}, (err, result) => {
        if(err) { console.log(err) }
        else {
            if(result.deletedCount != 0) { res.status(200).send('Deleted successfully.') }
            else { res.status(404).send('Wrong id') }
        }
    })
})*/

module.exports = router