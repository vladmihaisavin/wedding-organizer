import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { createBrowserHistory } from "history"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import ProtectedRoute from './components/structure/ProtectedRoute'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Main from './pages/Main'
import Users from './components/sections/Users'

const hist = createBrowserHistory()

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route exact path="/">
                <Redirect to="/dashboard" />
            </Route>
            <Route path="/login" component={Login} />
            <ProtectedRoute exact path="/dashboard" component={Main} content={Users} />
            <Route component={NotFound} />
        </Switch>
    </Router>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
