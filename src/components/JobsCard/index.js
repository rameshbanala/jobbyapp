import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

const JobsCard = props => {
  const renderJobsData = () => {
    const {eachJob} = props
    return (
      <Link to={`/jobs/${eachJob.id}`} className="job-link">
        <li key={eachJob.id} className="job-card">
          <div className="jobs-data-title-section">
            <img
              src={eachJob.companyLogoUrl}
              className="jobs-data-company-logo"
              alt="company logo"
            />
            <div>
              <h1 className="job-title">{eachJob.title}</h1>
              <p className="rating-container">
                <BsStarFill className="star-icon" /> {eachJob.rating}
              </p>
            </div>
          </div>
          <div className="location-salary-section">
            <div className="location-work-container">
              <div className="location-container">
                <FaMapMarkerAlt className="location-icon" />
                <p>{eachJob.location}</p>
              </div>
              <div className="location-container">
                <BsBriefcaseFill className="location-icon" />
                <p>{eachJob.employmentType}</p>
              </div>
            </div>
            <p className="salary-text">{eachJob.packagePerAnnum}</p>
          </div>
          <div>
            <hr />
          </div>
          <h1 className="desc-heading">Description</h1>
          <p className="job-desc">{eachJob.jobDescription}</p>
        </li>
      </Link>
    )
  }

  return renderJobsData()
}
export default JobsCard
