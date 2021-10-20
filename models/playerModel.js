const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema ({
    name: String,
    hp: Number,
    speed: String,
    armor: Number,
    stats: {
        str: {
            val: Number,
            mod: Number
        },
        dex: {
            val: Number,
            mod: Number
        },
        con: {
            val: Number,
            mod: Number
        },
        int: {
            val: Number,
            mod: Number
        },
        wis: {
            val: Number,
            mod: Number
        },
        cha: {
            val: Number,
            mod: Number
        }
    },
    lvl: Number,
    mastery: [String]
})

const PlayerModel = mongoose.model('player', schema, 'players')

module.exports = PlayerModel
