const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'gegegege',
    author: 'author authoritan',
    url: 'asdasdasd.net',
    likes: 5,
    blogs: 12
  },
  {
    title: 'Hyvä bloki',
    author: 'Blogi Ttaja',
    url: 'blogi.net',
    likes: 88,
    blogs: 11
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'a New Test Blog',
    author: 'Blog Tester',
    url: 'blogs.org',
    likes: 66,
    blogs: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const response = await api.get('/api/blogs')
  const content = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(content).toContain(newBlog.title)
})

test('blog with invalid content cant be added', async () => {
  const newBlog = {
    title: 'a New Test Blog',
    url: 'blogs.org',
    releaseDate: 201
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('returned blog elemements contains attribute "id"', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('if new blog post likes has no value, it is set to 0', async () => {
  const newBlog = {
    title: 'New Blog post with no Likes',
    author: 'stephen king',
    url: 'nolikes.com',
    blogs: 1
    //no likes
  }

  const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)
})

test('return status code 400 Bad Request if url is undefined', async () => {
  const newBlogNoUrl = {
    title: 'steph K',
    author: 'tester'
  }

  await api.post('/api/blogs')
    .send(newBlogNoUrl)
    .expect(400)
})

test('return status code 400 Bad Request if title is undefined', async () => {
  const newBlogNoTitle = {
    author: 'tester',
    url: 'test.com'
  }

  await api.post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)
})

test('blog element can be deleted if corresponding id is found from database', async () => {
  //new blog model
  const newBlog = new Blog({
    title: 'delete this blog',
    author: 'don the deleter',
    url: 'delete.com',
    likes: 0,
    blogs: 6
  })
  //store to savedBlog and save to database
  const savedBlog = await newBlog.save()

  //delete request for the saved object's id
  await api.delete(`/api/blogs/${savedBlog._id}`)
    .expect(204)

  //expect the deleted post id not to be found
  const response = await api.get(`/api/blogs/${savedBlog._id}`)
  expect(response.status).toBe(404)
})

test('blog element likes can be updated', async () => {
  //initial blog to update
  const initialBlog = {
    title: 'Update Likes test',
    author: 'Updater',
    url: 'update.com',
    likes: 0,
    blogs: 4
  }

  //post the initial blog
  const createdBlogResponse = await api.post('/api/blogs')
    .send(initialBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const createdBlog = createdBlogResponse.body
  console.log(createdBlog.id)

  //updated blog
  const updatedBlogData = {
    ...createdBlog,
    likes: 1
  }

  //http put request to update by id
  await api.put(`/api/blogs/${createdBlog.id}`)
    .send(updatedBlogData)
    .expect(200)

  //verify that likes have updated
  const updatedBlogResponse = await api.get(`/api/blogs/${createdBlog.id}`)
  const updatedBlog = updatedBlogResponse.body

  expect(updatedBlog.likes).toBe(1)
})

test('author with the most blog posts is returned', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = response.body

  //find the blog with the highest 'blogs' count
  let maxBlogs = 0
  let authorWithMostBlogs = ''
  blogs.forEach(blog => {
    if (blog.blogs && blog.blogs > maxBlogs) { //check if blogs is undefined and if it's greater than current maximum
      maxBlogs = blog.blogs
      authorWithMostBlogs = blog.author
    }
  })

  console.log(`Author with most blogs: ${authorWithMostBlogs}, Blog Count: ${maxBlogs}`)

  expect(authorWithMostBlogs).toBeTruthy()
  expect(maxBlogs).toBeGreaterThan(0)
})

test('blog post with the highest likes is returned', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = response.body

  //find the blog with the highest likes
  let maxLikes = 0
  let blogWithMostLikes = null
  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      blogWithMostLikes = blog
    }
  })

  console.log(`Blog with most likes: ${blogWithMostLikes.author}, Likes: ${maxLikes}`)

  expect(blogWithMostLikes).toBeTruthy()
  expect(blogWithMostLikes.likes).toBe(maxLikes)
  expect(blogWithMostLikes.author).toBeTruthy()
})

afterAll(async () => {
  await mongoose.connection.close()
})