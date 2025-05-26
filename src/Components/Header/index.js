import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const history = useHistory()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-content">
      <div className="nav-bar-mobile-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
        <ul className="nav-mobile-list-view">
          <li>
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                className="nav-icon"
                alt="nav home"
              />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                className="nav-icon"
                alt="nav jobs"
              />
            </Link>
          </li>
          <li>
            <button
              onClick={onClickLogout}
              className="icon-button"
              type="button"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                className="nav-icon"
                alt="nav logout"
              />
            </button>
          </li>
        </ul>
      </div>

      <div className="nav-bar-large-medium-devices">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <ul className="nav-large-list-view">
          <li className="nav-list-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-list-item">
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header
