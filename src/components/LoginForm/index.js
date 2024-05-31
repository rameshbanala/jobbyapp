import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isError: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  errorLogin = errMsg => {
    this.setState({
      isError: true,
      errMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const details = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.errorLogin(data.error_msg)
    }
  }

  renderLoginContainer = () => {
    const {username, password, isError, errMsg} = this.state
    return (
      <div className="main-login-bg">
        <div className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="website-logo-img"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div>
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div>
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button className="login-submit-btn" type="submit">
              Login
            </button>
            <p className="error-message">{isError ? `*${errMsg}` : ''}</p>
          </form>
        </div>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderLoginContainer()
  }
}
export default LoginForm
