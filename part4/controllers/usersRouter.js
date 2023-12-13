const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{7,}$/
  return passwordRegex.test(password)
}

//HTTP GET USER DATA
usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, likes: 1, id: 1} )
  res.json(users)
})

//HTTP POST NEW USER
usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body
    
  if(!validatePassword(password)) {
    return res.status(400).json({error: 'invalid password format test'})
  }

  //pw crypting magic happening here
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User ({
    username,
    name,
    passwordHash
  })
  
  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter