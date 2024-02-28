import {Component} from 'react'
import Loader from 'react-loader-spinner'
import EachItem from './components/EachItem'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const constantsList = {
  initial: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const ListItem = props => {
  const {eachItem} = props
  const {id, displayText} = eachItem
  return <option value={id}>{displayText}</option>
}
// Replace your code here
class App extends Component {
  state = {
    ActiveId: categoriesList[0].id,
    projectList: [],
    status: constantsList.initial,
  }

  componentDidMount() {
    this.getResult()
  }

  getResult = async () => {
    const {ActiveId} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${ActiveId}`,
    )
    console.log(response.ok)
    const data = await response.json()
    const projectData = data.projects

    if (response.ok) {
      const updatedData = projectData.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({projectList: updatedData, status: constantsList.success})
    } else {
      this.setState({status: constantsList.failure})
    }
  }

  changeActiveId = event => {
    this.setState(
      {ActiveId: event.target.value, status: constantsList.initial},
      this.getResult,
    )
  }

  onRetry = () => {
    this.setState({status: constantsList.initial}, this.getResult)
  }

  onSuccess = () => {
    const {projectList} = this.state
    return (
      <ul className="projects-cont">
        {projectList.map(each => (
          <EachItem listItems={each} key={each.id} />
        ))}
      </ul>
    )
  }

  onLoading = () => (
    <div data-testid="loader" className="container">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  onFailure = () => (
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="img2"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for
      </p>
      <button className="btn" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderItems = () => {
    const {status} = this.state
    switch (status) {
      case constantsList.initial:
        return this.onLoading()
      case constantsList.success:
        return this.onSuccess()
      case constantsList.failure:
        return this.onFailure()
      default:
        return null
    }
  }

  render() {
    const {ActiveId} = this.state
    return (
      <div className="main-container">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="website-img"
          />
        </div>
        <div className="inner-cont">
          <select
            onChange={this.changeActiveId}
            className="select-options"
            value={ActiveId}
          >
            {categoriesList.map(each => (
              <ListItem eachItem={each} key={each.id} />
            ))}
          </select>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

export default App
