import React, { Component } from 'react';

import { listen, speak, stopListening } from '../../actions/SpeechActions';
import { login } from '../../actions/UserActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      listening: false
    };

    this.handleListen = this.handleListen.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentWillUnmount() {
  //   stopListening().then(() => {
  //     console.log('stop');
  //   });
  // }

  componentWillMount() {
    // stopListening().then(() => {
    //   console.log('stop');
    // });
    this.setState(
      {
        listening: !this.state.listening
      },
      this.handleListen
    );
  }

  handleListen() {
    //debugger;
    console.log('listening?', this.state.listening);
    speak('Login');

    if (this.state.listening) {
      speak('Give your email id');
      listen().then(result => {
        this.setState({ email: result });
        stopListening().then(() => {
          speak('Give your password');
          listen().then(result => {
            this.setState({ password: result });
            stopListening().then(() => {
              this.onSubmit();
            });
          });
        });
      });
    } else {
      stopListening();
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit() {
    // e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user)
      .then(res => {
        if (res) {
          speak('Login Successfully');
          this.props.history.push(`/compose`);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
