import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getProfileDetails = async () => {
    setApiStatus(apiStatusConstants.progress)
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      setProfileDetails(profileData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getProfileDetails()
  }, [])

  const renderSuccessView = () => (
    <div className="profile-container">
      <img
        src={profileDetails.profileImageUrl}
        alt="profile"
        className="profile-image-section"
      />
      <h1 className="profileName">{profileDetails.name}</h1>
      <p className="profile-short-bio">{profileDetails.shortBio}</p>
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view">
      <button
        type="button"
        data-testid="button"
        className="job-item-failure-button"
        onClick={getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderProfileView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.progress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return <div className="render-section">{renderProfileView()}</div>
}

export default Profile
