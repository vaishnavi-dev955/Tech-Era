import {Route, Switch} from 'react-router-dom'

import CourseItemDetails from './components/CourseItemDetails'
import TechEra from './components/TechEra'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
