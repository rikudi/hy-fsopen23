const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user at db', () => {
  //format test database to have a single user data before tests
  beforeEach(async () => {
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('Sekret1234!', 10)
    const user = new User({ username: 'RootUser', name:'Admin', passwordHash })
  
    await user.save()
  })
  
  test('creation succeeds with a fresh username and valid credentials', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log(usersAtStart)
  
    const newUser = {
      username: 'rikudi',
      name: 'Riku Kaartoaho',
      password: 'Salainen2!'
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
    console.log(usernames)
  })

  test('creation fails when username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'RootUser',
      name: 'root',
      password: 'Salainen1!',
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    expect(result.body.error).toContain(result.body.error)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('Blog API', () => {
  let token
  let invalidToken = 'thisisnotavalidtoken'
  
  beforeAll(async () => {
    //Format blogs
    await Blog.deleteMany({})

    //create a test user
    const passwordHash = await bcrypt.hash('testpassworD!', 10)
    const user = new User({ username: 'testuser', passwordHash })
    await user.save()
  
    //log in to obtain a token
    const response = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'testpassworD!' })
  
    token = response.body.token
  })
  
  test('DELETE /api/blogs/:id succeeds with valid token', async () => {
    const blogsBeforeDelete = await Blog.find({})
    const initialBlogCount = blogsBeforeDelete.length
    //create a blog post to delete
    const newBlog = {
      title: 'rikudis Blog test post3',
      author: 'riku kaartoaho',
      url: 'blogger.com',
      likes: 0,
      blogs: 0
    }
  
    const createdBlogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
  
    const blogToDelete = createdBlogResponse.body
  
    //delete the blog post
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  
    //additional assertions to verify deletion
    const blogsAfterDelete = await Blog.find({})
    console.log('blogs after delete: ', blogsAfterDelete)
    expect(blogsAfterDelete.length).toBe(initialBlogCount)
  })

  test('creates a blog post when the user is authorized', async () => {
    const newBlog = {
      title: 'Authorized Blog Post',
      author: 'Authorized Author',
      url: 'example.com',
      likes: 0,
      blogs: 0
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    // Verify that the blog post is added
    const blogsAfterPost = await Blog.find({})
    expect(blogsAfterPost).toHaveLength(1)
    expect(blogsAfterPost[0].title).toBe(newBlog.title)
  })

  test('fails to create a blog post when no token is provided', async () => {
    await Blog.deleteMany({})
    const newBlog = {
      title: 'Unauthorized Blog Post',
      author: 'Unauthorized Author',
      url: 'example.com',
      likes: 0,
      blogs: 0
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${invalidToken}`)
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  
    const blogsAfterPostAttempt = await Blog.find({})
    expect(blogsAfterPostAttempt).toHaveLength(0)
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })
})
