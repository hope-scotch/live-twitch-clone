import React from 'react'
// import { BrowserRouter, Route } from 'react-router-dom'
import { Router, Route, Switch } from 'react-router-dom'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'
import StreamEdit from './streams/StreamEdit'
import StreamCreate from './streams/StreamCreate'
import StreamDelete from './streams/StreamDelete'
import Header from './Header'
import history from '../history'

// BrowserRouter uses its own history prop
// We want to use our custom history prop so that we have a handle to it anywhere inside the app
// In that case, we need to create our own custom Router

// Switch shows any one match and does NOT show the other routes containing the route with similar props

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App