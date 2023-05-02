const mongoose = require('mongoose')

const TaskListSchema = mongoose.Schema({
  text: String
})

const Tasklist = mongoose.model('tasklist', TaskListSchema)

module.exports = Tasklist
