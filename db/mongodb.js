require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const db = {
  connect: () => {
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
  }
}

module.exports = db
