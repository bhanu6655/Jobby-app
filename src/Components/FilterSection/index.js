import './index.css'

const FilterSection = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    activeSalaryRangeId,
    changeSalary,
    activeEmploymentTypeIds,
    changeEmploymentType,
  } = props

  const onChangeSalary = event => {
    changeSalary(event.target.value)
  }

  const onChangeEmploymentType = event => {
    changeEmploymentType(event.target.value)
  }

  const renderSalaryFilters = () => (
    <>
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salary-list">
        {salaryRangesList.map(salary => (
          <li className="salary-item" key={salary.salaryRangeId}>
            <label className="salary-label">
              <input
                type="radio"
                name="salary"
                value={salary.salaryRangeId}
                checked={activeSalaryRangeId === salary.salaryRangeId}
                onChange={onChangeSalary}
              />
              <span className="salary-name">{salary.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderEmploymentFilters = () => (
    <>
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-list">
        {employmentTypesList.map(type => (
          <li className="employment-item" key={type.employmentTypeId}>
            <label className="employment-label">
              <input
                type="checkbox"
                value={type.employmentTypeId}
                checked={activeEmploymentTypeIds.includes(
                  type.employmentTypeId,
                )}
                onChange={onChangeEmploymentType}
              />
              <span className="employment-name">{type.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div>
      {renderEmploymentFilters()}
      {renderSalaryFilters()}
    </div>
  )
}

export default FilterSection
