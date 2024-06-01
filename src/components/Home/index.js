import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="main-bg">
    <Header />
    <div className="home-content-container">
      <h1 className="home-title">Find The Job That Fits Your Life</h1>
      <p className="home-desc">
        Millions of people are searching for jobs, salary informantion, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="btn-link">
        <button type="button" className="home-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home
