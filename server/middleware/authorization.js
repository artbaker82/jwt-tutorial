const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
  try {
    const token = req.header('token')
    console.log(token)

    if (!token) return res.status(403).send('Not Authorized')

    const payload = jwt.verify(token, process.env.jwtSecret)

    req.user = payload.user
    
  } catch (error) {
    console.error(error)
    return res.status(403).json('Not Authorized')
  }
  next()
}