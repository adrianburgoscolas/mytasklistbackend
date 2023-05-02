require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const mainRouter = require('./router/index')
const apiRouter = require('./router/api')
const cors = require('cors')
const db = require('./db/mongodb')

db.connect()
const app = express()
app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.use('/', mainRouter)
app.use('/',apiRouter)

const port = process.env.PORT || 3001
app.listen(port, () => console.log("Listening on", port))
