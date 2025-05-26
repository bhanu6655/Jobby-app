import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errormsg, setErrormsg] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const history = useHistory()

  const onLoginsuccess = jwt_Token => {
    Cookies.set('jwt_token', jwt_Token, {expires: 30})
    history.replace('/')
  }

  const onFailure = errormsg => {
    setErrormsg(errormsg)
    setShowSubmitError(true)
  }

  const onChangeusername = event => {
    setUsername(event.target.value)
  }

  const onChangepassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitform = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onLoginsuccess(data.jwt_token)
    } else {
      onFailure(data.error_msg)
    }
  }

  const JwtToken = Cookies.get('jwt_token')
  if (JwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-bg-container">
      <div className="form-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt=" website logo"
          className="form-webiste-logo"
        />
        <form className="form-container" onSubmit={onSubmitform}>
          <label htmlFor="name" className="input-label">
            USERNAME
          </label>
          <input
            type="text"
            id="name"
            placeholder="Username"
            className="input-box"
            value={username}
            onChange={onChangeusername}
          />

          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            type="text"
            id="password"
            placeholder="Password"
            className="input-box"
            value={password}
            onChange={onChangepassword}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errormsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
