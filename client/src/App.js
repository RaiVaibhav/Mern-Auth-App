import React, { Component } from 'react';
import { HashRouter as Router, Route,Switch, NavLink} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from "./pages/PrivateRoutes";
// import { browserHistory } from 'react-router'
import Dashboard from "./pages/Dashboard";
import './App.css';
import Landing from './pages/Landing';

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.hash="#/sign-in"
  }
}
class App extends Component {
  render() {
    // console.log("hello");
    return (
      <Provider store ={store}>
        <Router basename="/">
          <div className="App">

            <div className="App__Form">
                <div className="PageSwitcher">
                    <NavLink to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Home</NavLink>
                </div>
                <Route exact path ="/" component={Landing} />

                <Route exact path="/sign-up" component={Register}>
                </Route>
                <Route exact path="/sign-in" component={Login}>
                </Route>
            
            <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            </div>
          </div>
        </Router>

      </Provider>
    );
  }
}

export default App;
