import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Blog from './Blog'
import NewBlog from './NewBlog'

describe('Blog.jsx ', () => {
  test('renders blog title and author by default', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://example.com',
      likes: 10,
      user: {
        name: 'Test User',
        username: 'testuser',
      },
    }

    const component = render(<Blog blog={blog} loggedInUsername="testuser" />)

    //check that title and author are rendered
    expect(component.container).toHaveTextContent('Test Blog Test Author')

    //check that likes and URL are not rendered by default
    expect(component.container).not.toHaveTextContent('Likes:')
    expect(component.container).not.toHaveTextContent('Url:')
  })

  test('renders full blog details when "View" button is clicked', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://example.com',
      likes: 10,
      user: {
        name: 'Test User',
        username: 'testuser',
      },
    }

    const component = render(<Blog blog={blog} loggedInUsername="testuser" />)

    //check that details are not rendered initially
    expect(component.container).not.toHaveTextContent('Likes: 10')
    expect(component.container).not.toHaveTextContent('Url: https://example.com')
    expect(component.container).not.toHaveTextContent('Added by: Test User')

    //click the view button
    const button = component.getByText('View')
    fireEvent.click(button)

    //check that details are rendered after click
    expect(component.container).toHaveTextContent('Likes: 10')
    expect(component.container).toHaveTextContent('Url: https://example.com')
    expect(component.container).toHaveTextContent('Added by: Test User')
  })

  test('calls the event handler twice when "Like" button is clicked twice', () => {
    //mock the event handler
    const handleLikeMock = jest.fn()

    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://example.com',
      likes: 10,
      user: {
        name: 'Test User',
        username: 'testuser',
      },
    }

    const component = render(
      <Blog blog={blog} handleLike={handleLikeMock} loggedInUsername="testuser" />
    )
    //click the view button
    const button = component.getByText('View')
    fireEvent.click(button)

    //click the like button twice
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    //check that the event handler was called twice
    expect(handleLikeMock).toHaveBeenCalledTimes(2)
  })
})

describe('NewBlog.jsx ', () => {
  test('calls the event handler when the form is submitted', async () => {
    //mock event handler
    const handleNotificationMock = jest.fn()
    //render component
    const { getByLabelText, getByText } = render(
      <NewBlog handleNotification={handleNotificationMock} />
    )

    //click the button to open up form
    fireEvent.click(getByText('Add blog'))

    const titleInput = getByLabelText('title')
    const authorInput = getByLabelText('author')
    const urlInput = getByLabelText('url')

    fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
    fireEvent.change(authorInput, { target: { value: 'Test Author' } })
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })

    fireEvent.click(getByText('Add'))

    await waitFor(() => {
      expect(handleNotificationMock).toHaveBeenCalledTimes(1)
    })
  })
})