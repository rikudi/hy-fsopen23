import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import authService from './services/auth'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    // Check if the user is logged in
    console.log('effect')
    const checkIfLoggedIn = () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      return !!loggedUserJSON // Convert to boolean
    }

    const fetchData = async () => {
      // Check if the user is logged in
      const loggedIn = checkIfLoggedIn()
      setIsLoggedIn(loggedIn)

      //fetch blogs if logged in
      if (loggedIn) {
        try {
          //parse data from localstorage and set to user state
          const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
          setUser(user)

          blogService.setToken(user.token)

          //fetch blogs
          const blogs = await blogService.getAll()
          //sort blogs based on the number of likes in descending order
          const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
          setBlogs(sortedBlogs)
        } catch (error) {
          console.error('Error fetching blogs:', error)
        }
      }
    }

    fetchData()
  }, [])

  //function to fetch blogs and save to state, used for new blog
  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    //sort blogs based on the number of likes in descending order
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  //handle logout
  const handeLogout = () => {
    authService.logout()
    setIsLoggedIn(false)
    setBlogs([])
  }

  const handleNotification = (message, type) => {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLike = async (id, updatedBlog) => {
    try {
      //map updated blogs
      const updatedBlogs = blogs.map(blog =>
        blog.id === id ? updatedBlog : blog
      )
      //sort blogs after updating likes
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
      //set updated&sorted blogs
      setBlogs(sortedBlogs)
      //update the database
      await blogService.update(id, updatedBlog)
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const handleRemove = async (id) => {
    try {
      //map updated blogs
      const updatedBlogs = blogs.filter(blog => blog.id !== id)
      //sort blogs after updating likes
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
      //set updated&sorted blogs
      setBlogs(sortedBlogs)
      //update the database
      await blogService.remove(id)
    } catch (error) {
      console.error('Error removing blog:', error)
    }
  }
  return (
    <div>
      {isLoggedIn ? (
        // Render blogs if isLoggedin = true
        <div>
          <h2>Blogs</h2>
          {notification && <Notification message={notification.message} type={notification.type}/>}
          <p>{user.name} logged in</p>
          <button id="logout-button" onClick={handeLogout}>Logout</button>
          <NewBlog handleNotification={handleNotification} fetchBlogs={fetchBlogs} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog}
              handleNotification={handleNotification}
              handleLike={handleLike}
              handleRemove={handleRemove}
              loggedInUsername={user.username} />
          ))}
        </div>
      ) : (
        // Render the login form if the user is not logged in
        <Login handleNotification={handleNotification} />
      )}
    </div>
  )
}

export default App