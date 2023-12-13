const User = require('../models/user')

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  totalLikes, favoriteBlog, usersInDb
}