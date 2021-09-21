const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('./models/dbConfig')
require('dotenv').config()
const creatures = require('./routes/CreatureController')

app.use(express.json())
app.use(cors())
app.use('/creatures', creatures)

app.listen(5500, () => {console.log("App started, and listen on port 5500.")})