import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {FaMapMarkerAlt} from 'react-icons/fa'
import './index.css'

const SimilarJobCard = props => {
  const {eachJob} = props
  return (
    <li className="each-similar-job-container">
      <div className="similar-jobs-data-title-section">
        <img
          src={eachJob.companyLogoUrl}
          className="similar-jobs-data-company-logo"
          alt="similar job company logo"
        />
        <div>
          <h1 className="similar-job-title">{eachJob.title}</h1>
          <p className="similar-rating-container">
            <BsStarFill className="similar-star-icon" /> {eachJob.rating}
          </p>
        </div>
      </div>
      <h1 className="desc-title">Description</h1>
      <p className="similar-job-description">{eachJob.jobDescription}</p>
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
      </div>
    </li>
  )
}
export default SimilarJobCard
