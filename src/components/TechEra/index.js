import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAl',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class TechEra extends Component {
  state = {coursesData: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const ApiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(ApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const UpdatedData = data.courses.map(eachItem => ({
        logoUrl: eachItem.logo_url,
        id: eachItem.id,
        name: eachItem.name,
      }))
      this.setState({coursesData: UpdatedData, apiStatus: apiConstants.success})
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
    const {coursesData} = this.state
    return (
      <div className="courses-container">
        <h1 className="courses-heading">Courses</h1>
        <ul className="sub-container2">
          {coursesData.map(eachItem => (
            <CourseItem CourseItemData={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  onClickTry = () => this.getCoursesData()

  FailureView = () => (
    <div className="Failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="Retry-button" onClick={this.onClickTry}>
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

export default TechEra
