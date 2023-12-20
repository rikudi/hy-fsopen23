import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/auth'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      // loginService.login returns a promise that resolves to a user
      const user = await loginService.login({
        username, password
      })
      //
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      // set token
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      alert(`welcome ${user.username}`)
      window.location.reload()
    } catch (exception) {
      alert('wrong credentials')
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
                    username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default Login

