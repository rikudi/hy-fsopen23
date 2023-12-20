describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST','http://localhost:3001/api/testing/reset')
    //create backend user
    const user = {
      name: 'sysadmin',
      username: 'sysadmin',
      password: 'Secret123!',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    const userTwo = {
      name: 'testuser',
      username: 'testuser',
      password: 'Secret123!'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', userTwo)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    //check that the login form is initially visible
    cy.get('form').should('be.visible')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {

      cy.get('#username').type('sysadmin')
      cy.get('#password').type('Secret123!')
      cy.get('#login-button').click()

      //check if alert contains welcome + user
      cy.on('window:alert', (message) => {
        expect(message).to.include('welcome sysadmin')

      })
    })

    it('fails with wrong credentials', function() {

      cy.get('#username').type('invalidUsername')
      cy.get('#password').type('invalidPassword')
      cy.get('#login-button').click()

      //check if alert contains 'wrong credentials'
      cy.on('window:alert', (message) => {
        expect(message).to.include('wrong credentials')

      })
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.get('#username').type('sysadmin')
      cy.get('#password').type('Secret123!')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      //get togglable button and click
      cy.contains('Add blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('Url')

      //submit form
      cy.get('#add-button').click()

      cy.contains('Blog Title created').should('exist')


      //check the add blog appears on screen
      cy.contains('Title: Title').should('exist')
      cy.contains('Author: Author').should('exist')
      cy.contains('View').should('exist')
    })

    it('A blog post can be liked', function() {
      //get togglable button and click
      cy.contains('Add blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('Url')

      //submit form
      cy.get('#add-button').click()

      cy.contains('Blog Title created').should('exist')


      cy.contains('View').click()
      cy.get('#like-button').click()
      cy.contains('Likes: 1').should('exist')
    })

    it('A blog post can be removed', function() {
      //get togglable button and click
      cy.contains('Add blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('Url')

      //submit form
      cy.get('#add-button').click()

      cy.contains('Blog Title created').should('exist')
      cy.contains('View').click()

      cy.get('.blog-item').should('have.length', 1)
      cy.get('#remove-button').click()
      cy.on('window:confirm', (message) => {
        expect(message).to.include('Remove blog Title by Author')
      })
      cy.get('.blog-item').should('not.exist')
    })

    it('Remove button should only be visible for the creator', function() {
      //get togglable button and click
      cy.contains('Add blog').click()
      cy.get('#title').type('Title')
      cy.get('#author').type('Author')
      cy.get('#url').type('Url')

      //submit form
      cy.get('#add-button').click()

      cy.contains('Blog Title created').should('exist')
      cy.contains('View').click()

      cy.get('.blog-item').should('have.length', 1)
      cy.get('#remove-button').should('exist')
      //logout and sign in on a different user
      cy.get('#logout-button').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('Secret123!')
      cy.get('#login-button').click()

      //check that remove button doesn't exist on the blog post
      cy.contains('View').click()
      cy.get('#remove-button').should('not.exist')
    })
  })
  describe('When multiple are added blogs', function() {
    beforeEach(function() {
      //reset database
      cy.request('POST','http://localhost:3001/api/testing/reset')
      // Create a user
      cy.request('POST', 'http://localhost:3001/api/users/', {
        username: 'testuser',
        name: 'Test User',
        password: 'Secret123!'
      })
      //login
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'testuser',
        password: 'Secret123!',
      }).then((loginResponse) => {
        const userToken = loginResponse.body.token

        // Add blog posts with the user's token
        const addBlogs = [
          { title: 'less-likes', author:'Author 1', likes: 2, url:'url.com' },
          { title: 'more-likes', author:'Author 2', likes: 10, url:'url.com' },
        ]

        addBlogs.forEach(blog => {
          cy.request({
            method: 'POST',
            url: 'http://localhost:3001/api/blogs/',
            body: blog,
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          })
        })
        cy.visit('http://localhost:5173')
      })
      // log in user here
      cy.get('#username').type('testuser')
      cy.get('#password').type('Secret123!')
      cy.get('#login-button').click()
    })
    it('sorts blogs by likes in descending format', function() {
      //verify that blogs are sorted correctly
      cy.get('.blog-item').eq(0).find('.blog-title').should('contain', 'Title: more-likes')
      cy.get('.blog-item').eq(1).find('.blog-title').should('contain', 'Title: less-likes')
    })
  })

})