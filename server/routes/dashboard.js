const router = require('express').Router()
const pool = require('../db')
const authorization = require('../middleware/authorization')

router.get('/', authorization, async (req,res) => {
  try {
    const user_id = req.user

    const user_name = await pool.query(
      'SELECT user_name FROM users WHERE user_id = $1;',
      [user_id]
    )

    res.json(user_name.rows[0])

  } catch (error) {
    console.error(error)
    res.status(500).json('server error')
  }
})


module.exports = router