const express = require('express')
const app = express()
const cors = require('cors')

//middleware
app.use(express.json())
app.use(cors())

//ROUTES


app.listen(5000, () => {
  console.log('app running on port 5000')
})