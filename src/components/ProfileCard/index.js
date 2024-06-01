import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileCard extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  clickOnRetry = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileCard = () => {
    const {profileDetails} = this.state
    const {profileImgUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-card">
        <img src={profileImgUrl} className="profile-card-img" alt="profile" />
        <h1 className="profile-card-title">{name}</h1>
        <p className="profile-card-desc">{shortBio}</p>
      </div>
    )
  }

  renderLoading = () => (
    <div data-testid="loader" className="profileloading-contianer">
      <Loader type="ThreeDots" color="#7e858e" height={80} width={80} />
    </div>
  )

  renderRetryButton = () => (
    <div className="profileloading-contianer">
      <button
        type="button"
        className="retry-button"
        onClick={this.clickOnRetry}
      >
        Retry
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileCard()
      case apiStatusConstants.failure:
        return this.renderRetryButton()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderApiStatus()}</>
  }
}
export default ProfileCard
