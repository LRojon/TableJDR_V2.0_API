const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema ({
    owner: Schema.Types.ObjectId,
    name: String,
    players: [String]
})

const PartyModel = mongoose.model('party', schema, 'parties')

module.exports = PartyModel
