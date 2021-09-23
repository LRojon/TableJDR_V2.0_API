const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('./models/dbConfig')
require('dotenv').config()
const creatures = require('./routes/CreatureController')

app.use(express.json())
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Content-Type: application/json")
    next()
})
app.use('/creatures', creatures)

app.listen(8102, () => {console.log("App started, and listen on port 8102.")})
