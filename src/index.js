import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App2 from './App2';
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'
import Registration_ext from './components/Registration/Registration_ext'
import * as serviceWorker from './serviceWorker';


import { BrowserRouter as Router, Route } from 'react-router-dom';
ReactDOM.render(
    <Router>
        <div>
          <Route path='/' exact component={App2} />
          <Route path='/login' component={Login} />
          <Route path='/registration' component={Registration} />
          <Route path='/registration_ext' component={Registration_ext} />
        </div>
    </Router>,
    document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
