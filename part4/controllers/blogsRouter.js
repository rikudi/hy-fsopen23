const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middlewares = require('../utils/middlewares')
const config = require('../utils/config')

//HTTP GET ALL REQUEST
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})
//HTTP GET REQUEST BY ID
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
//HTTP POST REQUEST
blogsRouter.post('/', middlewares.userExtractor,async (request, response, next) => {
  const body = request.body

  //verify token from request authorization header and decode it to object format
  const decodedToken = jwt.verify(request.token, config.SECRET)
  //if decoded token doesn't contain user id attribute
  if(!decodedToken.id) {
    return response.status(401).json({error: 'invalid token'})
  }
  //find user from database using id attribute provided by the decodedToken and store it to user
  const user =  await User.findById(decodedToken.id)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    blogs: body.blogs,
    user: user._id
  })

  try {
    //save new blog that has unique user id attribute
    const savedBlog = await blog.save()
    //save blogs unique id to users blogs[] list
    user.blogs = user.blogs.concat(savedBlog._id)
    //save user changes to database
    await user.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

//HTTP DELETE REQUEST
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blogToDelete = await Blog.findById(request.params.id)
    if (!blogToDelete) {
      return response.status(404).json({ error: 'blog post not found' })
    }
    console.log(request.user._id)
    //check if the user making the request is the one who created the blog post
    if (blogToDelete.user.toString() !== request.user._id.toString()) {
      return response.status(401).json({ error: 'only the creator can delete a blog post' })
    }

    //delete the blog post
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

//HTTP PUT REQUEST
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blogToUpdateId = request.params.id

  //used to update likes
  const updateData = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    blogs: body.blogs
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogToUpdateId, updateData, { new: true })
    response.status(200).json(updatedBlog)
  }
  catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter