import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async (credentials)  => {
  try {
    const response = await axios.post(baseUrl, credentials)
    console.log('Logged in successfully:', response.username)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }

}

const logout = () => {
  //clear localstorage
  window.localStorage.removeItem('loggedBlogappUser')
  console.log('Logging out')
}

export default { login, logout }