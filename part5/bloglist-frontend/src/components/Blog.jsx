import { useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleLike, handleRemove, loggedInUsername }) => {
  const toggleRef = useRef()

  const updateLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    handleLike(blog.id, updatedBlog)
  }

  const removeBlog = async () => {
    if (blog.user.username === loggedInUsername) {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        handleRemove(blog.id)
      }
    }
  }


  return (
    <div className="blog-item">
      <div>
        <p className='blog-title'>Title: {blog.title}</p>
        <p className='blog-author'>Author: {blog.author}</p>
      </div>
      <Togglable buttonLabel="View" ref={toggleRef} >
        <button onClick={() => toggleRef.current.toggleVisibility()}>Hide</button>
        <div className="blog-details">
          <p>Url: {blog.url}</p>
          <p className='blog-likes'>Likes: {blog.likes}</p><button id="like-button" onClick={updateLikes}>Like</button>
        </div>
        <p>Added by: {blog.user.name}</p>
        {loggedInUsername === blog.user.username && (
          <button id="remove-button" onClick={removeBlog}>Remove</button>
        )}
      </Togglable>
    </div>
  )
}

export default Blog