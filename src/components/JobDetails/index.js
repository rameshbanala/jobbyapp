import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {FaMapMarkerAlt, FaExternalLinkAlt} from 'react-icons/fa'
import SimilarJobCard from '../SimilarJobCard'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    similarJobDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getItemDetails()
  }

  onClickRetry = () => {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jdetails = data.job_details
      const updatedjobDetails = {
        companyLogoUrl: jdetails.company_logo_url,
        companyWebsiteUrl: jdetails.company_website_url,
        employmentType: jdetails.employment_type,
        id: jdetails.id,
        jobDescription: jdetails.job_description,
        lifeAtCompany: {
          description: jdetails.life_at_company.description,
          imageUrl: jdetails.life_at_company.image_url,
        },
        location: jdetails.location,
        pacakgePerAnnum: jdetails.package_per_annum,
        rating: jdetails.rating,
        skills: jdetails.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: jdetails.title,
      }
      const similarJobDetails = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails: updatedjobDetails,
        similarJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobItem = () => {
    const {jobDetails} = this.state
    console.log(jobDetails)
    return (
      <div className="job-item-details">
        <div className="jobs-details-data-title-section">
          <img
            src={jobDetails.companyLogoUrl}
            className="jobs-data-company-logo"
            alt="job details company logo"
          />
          <div>
            <h1 className="jobs-title">{jobDetails.title}</h1>
            <p className="ratings-container">
              <BsStarFill className="star-icon" /> {jobDetails.rating}
            </p>
          </div>
        </div>
        <div className="location-salary-section">
          <div className="location-work-container">
            <div className="location-container">
              <FaMapMarkerAlt className="location-icon" />
              <p>{jobDetails.location}</p>
            </div>
            <div className="location-container">
              <BsBriefcaseFill className="location-icon" />
              <p>{jobDetails.employmentType}</p>
            </div>
          </div>
          <p className="salary-text">{jobDetails.pacakgePerAnnum}</p>
        </div>
        <div>
          <hr />
        </div>
        <div className="job-details-description-container">
          <h1 className="desc-title">Description</h1>
          <div>
            <a
              className="external-link"
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit <FaExternalLinkAlt />
            </a>
          </div>
        </div>
        <p className="main-desc-text">{jobDetails.jobDescription}</p>
        <h1 className="desc-title">Skills</h1>
        <ul className="skill-container">
          {jobDetails.skills.map(eachSkill => (
            <li key={eachSkill.name} className="skill-list-container">
              <img
                src={eachSkill.imageUrl}
                className="skill-img"
                alt={eachSkill.name}
              />
              <p>{eachSkill.name}</p>
            </li>
          ))}
        </ul>
        <h1 className="desc-title">Life at Company</h1>
        <div className="life-at-company-container">
          <p>{jobDetails.lifeAtCompany.description}</p>
          <img src={jobDetails.lifeAtCompany.imageUrl} alt="life at company" />
        </div>
      </div>
    )
  }

  renderFailure = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="no-jobs-img"
        alt="failure view"
      />
      <h1 className="no-jobs-title">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loading-contianer">
      <Loader type="ThreeDots" color="#7e858e" height={80} width={80} />
    </div>
  )

  renderJobDetailsPage = () => {
    const {similarJobDetails} = this.state
    return (
      <>
        {this.renderJobItem()}
        <h1 className="desc-title">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobDetails.map(eachJob => (
            <SimilarJobCard key={eachJob.id} eachJob={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobDetailsPage()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderApiStatus()}
        </div>
      </>
    )
  }
}
export default JobDetails
