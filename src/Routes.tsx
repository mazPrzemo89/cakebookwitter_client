import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import FrontPage from './FrontPage'
import AddCake from './components/AddCake'
import Cake from './components/Cake'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={FrontPage}></Route>
        <Route path="/addcake" exact component={AddCake}></Route>
        <Route path="/cake" exact component={Cake}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
