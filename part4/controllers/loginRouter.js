const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const {username, password} = req.body

  //check if username is found
  const user = await User.findOne({username})

  //A Boolean that returns contains ternary operator, that first checks if username is found. Return true or false
  //Then use brycpt.compare to check if password is correct. Return true or false
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  //if both username and password are not true -> invalid credentials
  if(!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }
  //generate unique access token for user using secret
  const token = jwt.sign(userForToken, config.SECRET)

  res
    .status(200)
    .send({token, username: user.username, name: user.name})
})

module.exports = loginRouter