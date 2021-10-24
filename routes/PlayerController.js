const express = require('express')
const router = express.Router()

const PlayerModel = require('../models/playerModel')
const { UserModel, TokenModel } = require('../models/userModel')

router.get('/get/all', (req, res) => { // Get All
    TokenModel.findOne({ token: req.body.token }, (err, token) => {
        if(err) { console.log(err) }
        else {
            console.log(token)
            if(token === null) {
                res.status(400).send('Token doesn\'t exist')
            }
            else {
                if(token.expirationDate.getTime() < Date.now()) {
                    res.status(400).send('Token expired')
                }
                else {
                    PlayerModel.find({ owner: token.owner }, (err, docs) => {
                        if(err) { console.log(err) }
                        else {
                            res.send(docs) 
                        }
                    })
                }
            }
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
    
    TokenModel.findOne({ token: req.body.token }, (err, token) => {
        if(err) { console.log(err) }
        else {
            console.log(token)
            if(token === null) {
                res.status(400).send('Token doesn\'t exist')
            }
            else {
                if(token.expirationDate.getTime() < Date.now()) {
                    res.status(400).send('Token expired')
                }
                else {
                    PlayerModel.findOne({ name: req.params.name, owner: token.owner }, (err, doc) => {
                        if(err) { console.log(err) }
                        else {
                            if(doc != null) { res.send(doc) }
                            else { res.status(404).send('Wrong name') }
                        }
                    })
                }
            }
        }
    })
})

router.post('/set/one', (req, res) => { // Create One / Update One
    TokenModel.findOne({ token: req.body.token }, (err, token) => {
        if(err) { console.log(err); }
        else {
            if(token !== null) {
                if(token.expirationDate.getTime() > Date.now()) {
                    UserModel.findOne({ _id: token.owner }, (err, user) => {
                        if(err) { console.log(err); }
                        else {
                            if(user !== null) {
                                PlayerModel.find({ name: req.body.character.name, owner: user._id}, (err, docs) => {
                                    if(err) { console.log(err) }
                                    else {
                                        let char = {...req.body.character}
                                        char['owner'] = user._id
                                        if(docs.length != 0) {
                                            PlayerModel.replaceOne({name: char.name}, char, (err, doc) => {
                                                if(err) { console.log(err) }
                                                else { res.status(200).send('Updated successfully.') }
                                            })
                                        }
                                        else {
                                            PlayerModel.create(char, (err) => {
                                                if(err) { console.log(err) }
                                                else {
                                                    res.status(201).send('Created successfully.') 
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                            else {
                                res.status(400).send('This token hasn\'t an owner')
                            }
                        }
                    })
                }
                else {
                    res.status(400).send('Token expired')
                }
            }
            else {
                res.status(404).send('Token was not found')
            }
        }
    })
})

router.post('/del/one', (req, res) => {
    TokenModel.findOne({ token: req.body.token }, (err, token) => {
        if(err) { console.log(err); }
        else {
            if(token === null) {
                res.status(404).send('Token was not found')
            }
            else {
                if(token.expirationDate.getTime() < Date.now()) {
                    res.send(400).send('Token expired')
                }
                else {
                    UserModel.findOne({ _id: token.owner }, (err, user) => {
                        if(err) { console.log(err); }
                        else {
                            if(user === null) {
                                res.status(400).send('This token hasn\'t an owner')
                            }
                            else {
                                PlayerModel.deleteOne({_id: req.body.character_id, owner: user._id}, (err, result) => {
                                    if(err) { console.log(err) }
                                    else {
                                        if(result.deletedCount != 0) { res.status(200).send('Deleted successfully.') }
                                        else { res.status(404).send('Wrong id or you aren\'t the owner') }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
    })
})

module.exports = router