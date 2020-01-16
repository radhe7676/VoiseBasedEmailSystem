import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import ComposeEmail from './components/email/ComposeEmail';
import Start from './components/Start';

class App extends Component {
  constructor() {
    super();
    this.state = {
      changeView: false
    };
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    this.setState({
      changeView: !this.state.changeView
    });
  }
  render() {
    const start = (
      <div>
        <button onClick={this.buttonClick}>Start App</button>
      </div>
    );

    const afterClick = (
      <div>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/compose" component={ComposeEmail} />
      </div>
    );
    return (
      <div className="container">
        <Router>{this.state.changeView ? afterClick : start}</Router>
      </div>
    );
  }
}

export default App;
