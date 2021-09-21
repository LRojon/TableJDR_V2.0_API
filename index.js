const express = require('express')
const app = express()
require('./models/dbConfig')
require('dotenv').config()

app.listen(5500, () => {console.log("App started, and listen on port 5500.")})