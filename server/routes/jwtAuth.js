const router = require('express').Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
//register new user

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = await pool.query(
      'SELECT * FROM users WHERE user_email = $1;',
      [email]
    )

    if (user.rows.length !== 0) return res.status(401).send('User already exists')

    //encrypt the password
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const encryptedPassword = await bcrypt.hash(password, salt)

    //enter user in db

    const newUser = await pool.query(
      'INSERT INTO users(user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *;',
      [name, email, encryptedPassword]
    )

    //generate and return token
    const token = jwtGenerator(newUser.rows[0].user_id)

    res.json({ token })

  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
})

//login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await pool.query(
      'SELECT * FROM users WHERE user_email = $1',
      [email]
    )

    if (!user.rows[0]) return res.status(500).send('No user found')

    const { user_id, user_password } = user.rows[0]

    const match = await bcrypt.compare(password, user_password)
    //pass token
    if (match) {
      const token = jwtGenerator(user_id)
      return res.json({ token })
    }

    return res.status(401).send('Invalid credentials')

  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
})

module.exports = router