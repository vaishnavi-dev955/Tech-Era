import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="Not-Found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt=" not found"
        className="Not-Found-Image"
      />
      <h1 className="Not-found-heading">Page Not Found</h1>
      <p className="Not-found-para">
        We are sorry, the page you requested Could Not be Found
      </p>
    </div>
  </>
)

export default NotFound
