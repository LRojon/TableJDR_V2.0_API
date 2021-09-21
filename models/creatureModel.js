const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema ({
    name: String,
    type: String,
    size: String,
    hp: {
        stable: Number,
        random: String
    },
    speed: Number,
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
            mod: -1
        },
        cha: {
            val: Number,
            mod: Number
        }
    },
    skills: [String],
    sense: [String],
    language: [String],
    dangerousness: String,
    xp: Number,
    abilities: [
        {
            name: String,
            effect: String
        }
    ],
    actions: [
        {
            name: String,
            effect: {
                name: String,
                accuracy: Number,
                range: String,
                numTarget: Number
            },
            dmg: {
                stable: Number,
                random: String,
                type: String
            }
        }
    ]
})

const CreatureModel = mongoose.model('creature', schema, 'creatures')

module.exports = { CreatureModel }