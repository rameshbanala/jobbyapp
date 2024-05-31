import './index.css'

const JobsFilter = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    onChangeEmployment,
    onChangeSalary,
  } = props

  const renderEmploymentList = eachType => {
    const {employmentTypeId, label} = eachType
    const clickOnEmployeCheckBox = event => {
      onChangeEmployment(event.target.value)
    }
    return (
      <>
        <input
          type="checkbox"
          id={employmentTypeId}
          value={employmentTypeId}
          onChange={clickOnEmployeCheckBox}
        />
        <label htmlFor={employmentTypeId} className="checkbox-label">
          {label}
        </label>
      </>
    )
  }

  const renderSalaryRangesList = eachItem => {
    const {salaryRangeId, label} = eachItem

    const clickOnSalary = () => {
      onChangeSalary(salaryRangeId)
    }

    return (
      <div key={salaryRangeId}>
        <input
          type="radio"
          id={salaryRangeId}
          name="salary"
          value={salaryRangeId}
          onChange={clickOnSalary}
        />
        <label htmlFor={salaryRangeId} className="checkbox-label">
          {label}
        </label>
      </div>
    )
  }

  return (
    <>
      <div className="hr-container">
        <hr />
      </div>
      <h1 className="title-for-filters">Types of Employment</h1>
      <ul className="employment-types-container">
        {employmentTypesList.map(eachType => (
          <li key={eachType.employmentTypeId} className="each-item">
            {renderEmploymentList(eachType)}
          </li>
        ))}
      </ul>
      <div className="hr-container">
        <hr />
      </div>
      <h1 className="title-for-filters">Salary Range</h1>
      <ul className="employment-types-container">
        {salaryRangesList.map(eachItem => (
          <li key={eachItem.salaryRangeId} className="each-item">
            {renderSalaryRangesList(eachItem)}
          </li>
        ))}
      </ul>
    </>
  )
}
export default JobsFilter
