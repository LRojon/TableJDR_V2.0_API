const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addDays = (date, days) => {
    var result = date;
    result.setDate(result.getDate() + days);
    return result;
}
  

const schema = new Schema ({
    username: String,
    password: String
})

const tokenSchema = new Schema ({
    owner: Schema.Types.ObjectId,
    token: String,
    creationDate: { type: Date, default: new Date() },
    expirationDate: { type: Date, default: addDays(new Date(), 2) }
})

const UserModel = mongoose.model('user', schema, 'users')
const TokenModel = mongoose.model('token', tokenSchema, 'tokens')

module.exports = { UserModel, TokenModel }
