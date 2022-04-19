const express = require('express')
const app = express()
const cors = require('cors')

//middleware
app.use(express.json())
app.use(cors())

//ROUTES

//registration and login routes
app.use('/auth', require('./routes/jwtAuth'))
app.use ('/dashboard', require('./routes/dashboard'))

app.listen(5000, () => {
  console.log('app running on port 5000')
})