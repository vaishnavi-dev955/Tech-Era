import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <div className="Header-Container">
    <Link to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="webiste-logo"
      />
    </Link>
  </div>
)

export default Header
