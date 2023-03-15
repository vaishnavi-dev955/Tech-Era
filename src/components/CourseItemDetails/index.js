import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAl',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CourseItemDetails extends Component {
  state = {coursesIdData: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getCourseIdDetails()
  }

  getCourseIdDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const ApiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(ApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const UpdatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        coursesIdData: UpdatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  LoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  SuccessView = () => {
    const {coursesIdData} = this.state
    const {imageUrl, name, description} = coursesIdData
    return (
      <div className="item-container">
        <div className="success-container">
          <img src={imageUrl} alt={name} className="image-style" />
          <div>
            <h1 className="title1">{name}</h1>
            <p className="para1">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  onClickRetryButton = () => {
    this.getCourseIdDetails()
  }

  FailureView = () => (
    <div className="Failure-container1">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading1">Oops! Something Went Wrong</h1>
      <p className="failure-para1">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="Retry-button1"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderingTheViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.SuccessView()
      case apiConstants.failure:
        return this.FailureView()
      case apiConstants.inProgress:
        return this.LoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderingTheViews()}
      </>
    )
  }
}

export default CourseItemDetails
