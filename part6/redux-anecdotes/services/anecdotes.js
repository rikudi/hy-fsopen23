import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// HTTP GET request
const getAll = async () => {
    console.log("GET request to fetch all anecdotes")
  const response = await axios.get(baseUrl)
  return response.data
}

// HTTP POST request
const createNew = async (content) => {
    console.log("POST request to create a new anecdote")
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, createNew }