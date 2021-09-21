const mongoose = require('mongoose')

mongoose.connect(
    "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PWD + "@lrojon-alwaysdata.net/" + process.env.DB_ROOT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if(!err) console.log(err);
        else console.log('db connected.');
    }
)