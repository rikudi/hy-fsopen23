const blogsRouter = require('express').Router()
const Blog = require('../models/mongo')

//HTTP GET ALL REQUEST
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  console.log(blogs)
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
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    blogs: body.blogs
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})
//HTTP DELETE REQUEST
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blogToDelete = request.params.id
    await Blog.findByIdAndDelete(blogToDelete)
    //204 No content if succesful
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