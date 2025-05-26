import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import FilterSection from '../FilterSection'
import Profile from '../Profile'
import JobItem from '../JobItem'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const Jobs = () => {
  const [jobList, setJobList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchInput, setSearchInput] = useState('')
  const [activeSalaryRangeId, setActiveSalaryRangeId] = useState('')
  const [activeEmploymentTypeIds, setActiveEmploymentTypeIds] = useState([])

  const getJobs = useCallback(async () => {
    setApiStatus(apiStatusConstants.loading)
    const employmentTypes = activeEmploymentTypeIds.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      setJobList(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [activeSalaryRangeId, activeEmploymentTypeIds, searchInput])

  useEffect(() => {
    getJobs()
  }, [getJobs])

  const updateSalary = salaryId => {
    setActiveSalaryRangeId(salaryId)
    getJobs()
  }

  const updateEmploymentType = typeId => {
    const updatedTypes = activeEmploymentTypeIds.includes(typeId)
      ? activeEmploymentTypeIds.filter(id => id !== typeId)
      : [...activeEmploymentTypeIds, typeId]
    setActiveEmploymentTypeIds(updatedTypes)
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickGetJobs = () => {
    getJobs()
  }

  const renderSearchInput = () => (
    <div className="search-bar">
      <input
        className="search-input"
        type="search"
        placeholder="Search"
        value={searchInput}
        onChange={onChangeSearchInput}
      />
      <button
        className="search-button"
        type="button"
        data-testid="searchButton"
        onClick={onClickGetJobs}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  const renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  const renderJobsList = () =>
    jobList.length > 0 ? (
      <ul className="jobs-list-container">
        {jobList.map(eachJob => (
          <JobItem jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      renderNoJobsView()
    )

  const renderFailureView = () => (
    <div className="jobs-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for
      </p>
      <button className="failure-button" type="button" onClick={getJobs}>
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderJobsBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderJobsList()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="jobs-page-container">
      <Header />
      <div className="jobs-page">
        <div className="side-bar">
          <Profile />
          <hr className="seperator" />
          <FilterSection
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
            activeSalaryRangeId={activeSalaryRangeId}
            changeSalary={updateSalary}
            activeEmploymentTypeIds={activeEmploymentTypeIds}
            changeEmploymentType={updateEmploymentType}
          />
        </div>
        <div className="jobs-content">
          {renderSearchInput()}
          {renderJobsBasedOnApiStatus()}
        </div>
      </div>
    </div>
  )
}

export default Jobs
