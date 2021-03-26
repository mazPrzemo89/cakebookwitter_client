import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import FrontPage from './FrontPage'
import AddCake from './components/AddCake'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={FrontPage}></Route>
        <Route path="/addcake" exact component={AddCake}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
