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
            mod: Number
        },
        cha: {
            val: Number,
            mod: Number
        }
    },
    skills: [String],
    senses: [String],
    languages: [String],
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
            dmg: Object
        }
    ]
})

const CreatureModel = mongoose.model('creature', schema, 'creatures')

module.exports = CreatureModel