const crypto = require('crypto')

const isTheTokenOwner = (token, username, res, callback) => {
    UserModel.findOne({ username: username }, (err, user) => {
        if(err) { console.log(err) }
        else {
            TokenModel.findOne({
                token: token,
                owner: user._id
            }, (err, token) => {
                if(err) { console.log(err); }
                else { 
                    console.log({
                        owner: user.username,
                        token: token
                    })
                    if(token !== null) {
                        callback()
                    }
                    else {
                        res.status(400).send(username + ' isn\'t the owner of this token')
                    }
                }
            })
        }
    })
}

const generateToken = (user) => {
    const addDays = (date, days) => {
        var result = date;
        result.setDate(result.getDate() + days);
        return result;
    }
    const body = {
        created: Date.now(),
        name: user.username.substring(0, 3),
        expired: addDays(new Date(), 2).getTime()
    }
    let token = crypto.createHash('sha256').update(JSON.stringify(body)).digest('base64')

    return token
}

module.exports = { isTheTokenOwner, generateToken }