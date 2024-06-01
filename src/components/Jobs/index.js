import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import JobsCard from '../JobsCard'
import JobsFilter from '../JobsFilter'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsData: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: [],
    salaryType: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  onChangeEmployment = value => {
    this.setState(prevState => {
      const {employmentType} = prevState
      let updatedEmploymentType

      if (employmentType.includes(value)) {
        updatedEmploymentType = employmentType.filter(
          eachValue => eachValue !== value,
        )
      } else {
        updatedEmploymentType = [...employmentType, value]
      }

      return {employmentType: updatedEmploymentType}
    }, this.getJobsData)
  }

  onChangeSalary = value => {
    this.setState({salaryType: value}, this.getJobsData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickRetry = () => {
    this.getJobsData()
  }

  onClickSearchBtn = () => {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, employmentType, salaryType} = this.state
    const employDetails = employmentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employDetails}&minimum_package=${salaryType}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        jobDescription: eachJob.job_description,
        companyLogoUrl: eachJob.company_logo_url,
        rating: eachJob.rating,
        location: eachJob.location,
        employmentType: eachJob.employment_type,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loading-contianer">
      <Loader type="ThreeDots" color="#7e858e" height={80} width={80} />
    </div>
  )

  renderJobsData = () => {
    const {jobsData} = this.state
    return jobsData.length > 0 ? (
      <ul className="jobs-container">
        {jobsData.map(eachJob => (
          <JobsCard eachJob={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      this.renderNoJobsFound()
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
      <p>We cannot to seem to find the page you are looking.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderSearchCard = () => {
    const {searchInput} = this.state
    return (
      <div className="search-card">
        <label htmlFor="inputSearch">Search</label>
        <input
          type="search"
          className="input-search"
          value={searchInput}
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          id="inputSearch"
        />

        {/* Providing aria-label for button accessibility */}
        <button
          type="button"
          onClick={this.onClickSearchBtn}
          data-testid="searchButton"
          aria-label="Search"
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  checkTheApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsData()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  renderNoJobsFound = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-title">No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderJobsFilter = () => (
    <div className="jobs-filter-container">
      <JobsFilter
        employmentTypesList={employmentTypesList}
        salaryRangesList={salaryRangesList}
        onChangeEmployment={this.onChangeEmployment}
        onChangeSalary={this.onChangeSalary}
      />
    </div>
  )

  rendercards = () => (
    <div>
      <Header />
      <div className="jobs-page-bg">
        <div className="profile-card-filter-items-container">
          <ProfileCard />
          {this.renderJobsFilter()}
        </div>
        <ul className="jobs-container-main">
          <>
            {this.renderSearchCard()}
            {this.checkTheApiStatus()}
          </>
        </ul>
      </div>
    </div>
  )

  render() {
    return this.rendercards()
  }
}
export default Jobs
