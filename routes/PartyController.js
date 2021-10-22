const express = require('express')
const router = express.Router()

const PartyModel = require('../models/partyModel')
const { UserModel, TokenModel } = require('../models/userModel')

router.get('/get/all', (req, res) => { // Get All
    PartyModel.find({}, (err, docs) => {
        if(err) { console.log(err) }
        else {
            res.send(docs) 
        }
    })
})

router.get('/get/all/name', (req, res) => { // Get All Names
    PartyModel.find({}, (err, docs) => {
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
    PartyModel.findOne({ _id: req.params.id }, (err, doc) => {
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
    PartyModel.findOne({ name: req.params.name }, (err, doc) => {
        if(err) { console.log(err) }
        else {
            if(doc != null) { res.send(doc) }
            else { res.status(404).send('Wrong name') }
        }
    })
})

router.post('/set/one', (req, res) => { // Create One / Update One
    TokenModel.findOne({ token: req.body.token }, (err, token) => {
        if(err) { console.log(err) }
        else {
            if(token === null) {
                res.status(404).send("Token was not found")
            }
            else {
                if(token.expirationDate.getTime() < Date.now()) {
                    res.status(400).send("Token expired")
                }
                else {
                    UserModel.findOne({ _id: token.owner }, (err, user) => {
                        if(err) { console.log(err); }
                        else {
                            if(user === null) {
                                res.status(400).send("This token hasn't an owner")
                            }
                            else {
                                PartyModel.find({ name: req.body.party.oldName ? req.body.party.oldName : req.body.party.name, owner: user._id}, (err, docs) => {
                                    if(err) { console.log(err) }
                                    else {
                                        let party = {...req.body.party}
                                        party['owner'] = user._id
                                        if(docs.length != 0) {
                                            PartyModel.replaceOne({name: party.oldName ? party.oldName : party.name, owner: user._id}, party, err => {
                                                if(err) { console.log(err) }
                                                else { res.status(200).send('Updated successfully.') }
                                            })
                                        }
                                        else {
                                            PartyModel.create(party, (err) => {
                                                if(err) { console.log(err) }
                                                else {
                                                    res.status(201).send('Created successfully.') 
                                                }
                                            })
                                        }
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

router.post('/del/one/', (req, res) => {
    TokenModel.findOne({token: req.body.token}, (err, token) => {
        if(err) { console.log(err) }
        else {
            if(token === null) { res.status(404).send('Token was not found') }
            else {
                if(token.expirationDate.getTime() < Date.now()) {
                    res.status(400).send('Token expired')
                }
                else {
                    UserModel.findOne({ _id: token.owner }, (err, user) => {
                        if(err) { console.log(err); }
                        else {
                            if(user === null) { res.status(400).send("This token hasn't an owner") }
                            else {
                                PartyModel.findOne({_id: req.body.party_id, owner: user._id}, (err, party) => {
                                    if(err) { console.log(err); }
                                    else {
                                        if(party === null) { res.status(404).send("Party was not found or you aren\'t the owner") }
                                        else {
                                            if(party.players.length === 0) {
                                                PartyModel.deleteOne({_id: req.body.party_id, owner: user._id}, (err, result) => {
                                                    if(err) { console.log(err) }
                                                    else {
                                                        if(result.deletedCount != 0) { res.status(200).send('Deleted successfully.') }
                                                        else { res.status(404).send('Wrong id') }
                                                    }
                                                })
                                            }
                                            else {
                                                res.status(400).send('Party isn\'t empty.')
                                            }
                                        }
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