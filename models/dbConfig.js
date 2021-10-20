const mongoose = require('mongoose')
require('dotenv').config()

const url = "mongodb://" + process.env.DB_USER + ':' + process.env.DB_PWD + "@mongodb-lrojon.alwaysdata.net/" + process.env.DB_ROOT

mongoose.connect(
    //"mongodb://127.0.0.1:27017/HnD",
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if(err) console.log(err + url);
        else console.log('db connected.');
    }
)
