import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ul className="nav-bar">
      <Link to="/">
        <li><img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-bar-logo"
        /></li>
      </Link>
      <ul className="nav-bar-options">
        <Link to="/" className="nav-link">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li>Jobs</li>
        </Link>
      </ul>
      <button className="log-out-btn" type="button" onClick={onLogout}>
        Logout
      </button>
    </ul>
  )
}
export default withRouter(Header)
