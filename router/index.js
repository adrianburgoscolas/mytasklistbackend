const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send("Hello Task List")
})

module.exports = router
