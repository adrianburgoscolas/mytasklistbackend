const express = require('express')
const router = express.Router()
const tasklist = require('../models/tasklist')
const { ServerData } = require('../utils/datastruct')

//CRUD operations

//Create operation
router.post('/api/addtask', async (req, res) => {
  try {
    const task = new tasklist({text: req.body.text})
    const newTask = await task.save()
    const serverData = new ServerData(200, newTask)
    res.status(200).json(serverData.Data)
  } catch(err) {
    const serverData = new ServerData(500)
    res.status(500).json(serverData.Error('Database Error: Could not add new task', err.message))
  }
})

//Retrieve operation
router.get('/api/alltask', async (req, res) => {
  try {
    const list = await tasklist.find()
    const serverData = new ServerData(200, list)
    res.status(200).json(serverData.Data)
  } catch(err) {
    const serverData = new ServerData(500)
    res.status(500).json(serverData.Error('Database Error: Could not get tasks list', err.message))
  }
})

//Update operation
router.patch('/api/updatetask', async (req, res) => {
  try {
    const task = await tasklist.findByIdAndUpdate(req.body.id, {text: req.body.text}, {new: true})
    const serverData = new ServerData(200, task)
    res.status(200).json(serverData.Data)
  } catch(err) {
    const serverData = new ServerData(500)
    res.status(500).json(serverData.Error('Database Error: Could not update task', err.message))
  }
})

//Delete operation
router.delete('/api/deltask', async (req, res) => {
  try {
    const task = await tasklist.findByIdAndDelete(req.body.id)
    const serverData = new ServerData(200, task)
    res.status(200).json(serverData.Data)
  } catch(err) {
    const serverData = new ServerData(500)
    res.status(500).json(serverData.Error('Database Error: Could not delete task', err.message))
  }
})

module.exports = router
