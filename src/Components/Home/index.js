import Header from '../Header'
import './index.css'

const Home = () => {
  const onFindJobs = () => {}
  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-section">
        <h1 className="home-heading">
          Find the Job that <br /> fits your Life
        </h1>

        <p className="home-page-description">
          Millions of People are searching for jobs Salary information,company
          reviews . Find the job that fits your abilites and Potential
        </p>
        <p className="home-page-description-large">
          Millions of People are searching for jobs Salary
          <br />
          information,company reviews . Find the job that fits your
          <br />
          abilites and Potential
        </p>

        <button type="button" className="btn-element" onClick={onFindJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
