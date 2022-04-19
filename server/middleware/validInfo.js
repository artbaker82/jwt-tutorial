module.exports = (req, res, next) => {
  const {email, name, password} = req.body
  
  function isValidEmail(userEmail) {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userEmail)
  }



  if (req.path === '/register') {
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials')
    } else if (!isValidEmail(email)) {
      return res.status(401).json('Invalid email')
    }

  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.status(401).json('Missing Credentials')
    } else if (!isValidEmail(email)) {
      return res.status(401).json('Invalid email')
    }
  }

  next()

}

