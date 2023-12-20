import { useState, useRef } from 'react'
import BlogService from '../services/blogs'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const NewBlog = ({ handleNotification, fetchBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const toggleRef = useRef()
  //handle input field states
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'Title') {
      setTitle(value)
    } else if (name === 'Author') {
      setAuthor(value)
    } else if (name === 'Url') {
      setUrl(value)
    }
  }

  const resetFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  //send request to server on submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newBlog = await BlogService.create({
        title,
        author,
        url
      })
      console.log(newBlog)
      handleNotification(`Blog ${newBlog.title} created`, 'success')
      toggleRef.current.toggleVisibility()
      //fetch blogs from app.jsx
      fetchBlogs()
    } catch (error) {
      console.error('Failed to create new blog:', error)
      handleNotification(`Failed to create new blog: ${error.response.data.error}`, 'error')
    }
    resetFields()
  }

  NewBlog.propTypes = {
    handleNotification: PropTypes.func.isRequired
  }

  const toggleVisibility = () => {
    toggleRef.current.toggleVisibility()
  }

  return(
    <Togglable buttonLabel="Add blog" ref={toggleRef} >
      <div>
        <h2>Create a new blog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='title'>title</label>
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='author'>author</label>
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='url'>url</label>
            <input
              id="url"
              type="text"
              value={url}
              name="Url"
              onChange={handleChange}
            />
          </div>
          <button id="add-button" type="submit">Add</button>
          <button id="cancel-button" onClick={toggleVisibility}>Cancel</button>
        </form>
      </div>
    </Togglable>

  )
}

export default NewBlog