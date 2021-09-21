const mongoose = require('mongoose')

mongoose.connect(
    //"mongodb://" + process.env.DB_USER + ":" + process.env.DB_PWD + "@mongodb-lrojon.alwaysdata.net/" + process.env.DB_ROOT,
    "mongodb://127.0.0.1:27017/HnD",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if(err) console.log(err);
        else console.log('db connected.');
    }
)