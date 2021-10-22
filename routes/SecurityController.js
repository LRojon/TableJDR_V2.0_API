const express = require('express')
const router = express.Router()
const { UserModel, TokenModel } = require('../models/userModel')
const crypto = require('crypto')
const { isTheTokenOwner, generateToken } = require('../Helpers/SecurityFN')

router.post('/create', (req, res) => {
    UserModel.find({ username: req.body.username }, (err, docs) => {
        if(err) { console.log(err); }
        else {
            if(docs.length === 0) {
                UserModel.create({
                    username: req.body.username,
                    password: crypto.createHash('sha256').update(req.body.password).digest('hex')
                }, err => {
                    if(err) { console.log(err) }
                    else {
                        res.send("User Created successfully")
                    }
                })
            }
            else {
                console.log(generateToken(docs[0]))
                res.status(400).send("This user already exist")
            }
        }
    })
})

router.post('/login', (req, res) => { // login follow graph on white board
    UserModel.findOne({
        username: req.body.username,
        password: crypto.createHash('sha256').update(req.body.password).digest('hex')
    }, (err, user) => {
        if(err) { console.log(err); }
        else {
            if(user !== null) {
                TokenModel.findOne({ owner: user._id }, (err, token) => {
                    if(err) { console.log(err); }
                    else {
                        if(token === null) {
                            let tmp = generateToken(user)
                            console.log({
                                owner: user._id,
                                token: tmp
                            })
                            TokenModel.create({
                                owner: user._id,
                                token: tmp
                            }, err => {
                                if(err) { console.log(err); }
                                else {
                                    res.send({
                                        username: user.username,
                                        token: tmp
                                    })
                                }
                            })
                        }
                        else {
                            if(token.expirationDate.getTime() > Date.now()) {
                                res.send({
                                    username: user.username,
                                    token: token.token
                                })
                            } 
                            else {
                                TokenModel.deleteOne({ owner: user._id }).exec()
                                let tmp = generateToken(user)
                                TokenModel.create({
                                    owner: user._id,
                                    token: tmp
                                }, err => {
                                    if(err) { console.log(err); }
                                    else {
                                        res.send({
                                            username: user.username,
                                            token: tmp
                                        })
                                    }
                                })
                            }
                        }
                    }
                })
            }
            else {
                res.status(400).send('Wrong username and/or password')
            }
        }
    })
})

router.post('/delete', (req, res) => { 
    isTheTokenOwner(req.body.token, req.body.username, res, () => {
        TokenModel.findOne({ token: req.body.token }, (err, token) => {
            if(err) { console.log(err) }
            else {
                if(token.expirationDate.getTime() > Date.now()) {
                    TokenModel.deleteOne({ token: req.body.token }, err => err ? console.log(err) : null)
                    UserModel.deleteOne({ username: req.body.username }, err => err ? console.log(err) : null)
                    res.send('User deleted successfully')
                }
                else {
                    res.status(403).send('Token expired')
                }
            }
        })
    })
})

module.exports = router