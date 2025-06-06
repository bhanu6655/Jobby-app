import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'
import Home from './Components/Home'
import LoginForm from './Components/LoginForm'
import Jobs from './Components/Jobs'
import NotFound from './Components/NotFound'
import JobItem from './Components/JobItem'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
    <Route component={NotFound} />
  </Switch>
)

export default App
