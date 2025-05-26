import {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom'

import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const JobItem = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [jobDetails, setJobDetails] = useState({})
  const [similarJobs, setSimilarJobs] = useState([])
  const {id} = useParams()

  const getJobItem = useCallback(async () => {
    setApiStatus(apiStatusConstants.loading)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const jobDetailsData = data.job_details
        const similarJobsData = data.similar_jobs

        const updatedJobDetails = {
          companyLogoUrl: jobDetailsData.company_logo_url,
          companyWebsiteUrl: jobDetailsData.company_website_url,
          employmentType: jobDetailsData.employment_type,
          id: jobDetailsData.id,
          jobDescription: jobDetailsData.job_description,
          skills: jobDetailsData.skills.map(skill => ({
            imageUrl: skill.image_url,
            name: skill.name,
          })),
          lifeAtCompany: {
            imageUrl: jobDetailsData.life_at_company.image_url,
            description: jobDetailsData.life_at_company.description,
          },
          location: jobDetailsData.location,
          packagePerAnnum: jobDetailsData.package_per_annum,
          title: jobDetailsData.title,
          rating: jobDetailsData.rating,
        }

        const updatedSimilarJobs = similarJobsData.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        }))

        setJobDetails(updatedJobDetails)
        setSimilarJobs(updatedSimilarJobs)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [id])

  useEffect(() => {
    getJobItem()
  }, [getJobItem])

  const renderLoaderView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="jobs-api-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-api-failure-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={getJobItem}>
        Retry
      </button>
    </div>
  )

  const renderJobDetails = () => {
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      title,
      rating,
    } = jobDetails

    return (
      <div className="job-details-content-container">
        <div className="job-details">
          <div className="logo-title-container-card">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo-card"
            />
            <div className="title-rating-container-card">
              <h1 className="job-title-card">{title}</h1>
              <div className="rating-container-card">
                <AiFillStar className="star-icon-card" />
                <p className="rating-number-card">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-package-container-card">
            <div className="icon-type-container-card">
              <IoLocationSharp className="type-icon" />
              <p className="type-text">{location}</p>
            </div>
            <div className="icon-type-container-card">
              <BsFillBriefcaseFill className="type-icon" />
              <p className="type-text">{employmentType}</p>
            </div>
            <p className="package-text">{packagePerAnnum}</p>
          </div>

          <hr className="separator" />

          <div className="description-visit-link-container">
            <h1 className="description-heading-card">Description</h1>
            <a
              href={companyWebsiteUrl}
              className="company-link"
              target="_blank"
              rel="noreferrer"
            >
              Visit <FiExternalLink className="external-link-logo" />
            </a>
          </div>

          <p className="job-description-card">{jobDescription}</p>

          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(({imageUrl, name}) => (
              <li className="skill-item" key={name}>
                <img src={imageUrl} alt={name} className="skill-image" />
                <p className="skill-name">{name}</p>
              </li>
            ))}
          </ul>

          <div className="company-life-container">
            <div className="description">
              <h1 className="life-at-company-heading">Life at Company</h1>
              <p className="life-description">{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="company-life-img"
            />
          </div>
        </div>

        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(job => (
            <SimilarJobs key={job.id} jobDetails={job} />
          ))}
        </ul>
      </div>
    )
  }

  const renderApiStatusView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderJobDetails()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.loading:
        return renderLoaderView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="job-item">{renderApiStatusView()}</div>
    </>
  )
}

export default JobItem
