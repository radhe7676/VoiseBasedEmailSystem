import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

import { listen, speak, stopListening } from '../../actions/SpeechActions';
import { sendEmail } from '../../actions/EmailActions';

class ComposeEmail extends Component {
  constructor() {
    super();
    this.state = {
      to: '',
      subject: '',
      body: '',
      listening: false
    };

    this.handleListen = this.handleListen.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    stopListening().then(() => {
      console.log('stop');
    });
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
    speak('Compose Email');

    if (this.state.listening) {
      speak('Give receipent email id');
      listen().then(result => {
        this.setState({ to: result });
        stopListening().then(() => {
          speak('Give subject');
          listen().then(result => {
            this.setState({ subject: result });
            stopListening().then(() => {
              speak('Give email body');
              listen().then(result => {
                this.setState({ body: result });
                stopListening().then(() => {
                  this.onSubmit();
                });
              });
            });
          });
        });
      });
    } else {
      stopListening();
    }
  }

  logout() {
    //e.preventDefault();
    localStorage.removeItem('usertoken');
    stopListening().then(() => {
      speak('Logout Successfully');
      this.props.history.push(`/`);
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit() {
    //debugger;
    //e.preventDefault();
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const from = decoded.from;
    const newEmail = {
      to: this.state.to,
      from: decoded.email,
      subject: this.state.subject,
      body: this.state.body,
      _user: decoded.id
    };

    sendEmail(newEmail)
      .then(res => {
        //console.log(res);
        //this.props.history.push('/sentSuccess');
        speak('Email sent successfully');
        speak('Speak 1 to sent new email and 2 to logout');
        listen().then(res => {
          debugger;
          if (res === '1') {
            stopListening().then(() => {
              this.setState({ to: '', subject: '', body: '' }, this.handleListen);
            });
          }
          if (res === '2') {
            this.logout();
          }
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="container">
        <br />
        <h3>Compose Email</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="to">To</label>
            <input
              type="email"
              className="form-control"
              name="to"
              id="to"
              placeholder="name@example.com"
              value={this.state.to}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              id="subject"
              value={this.state.subject}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              className="form-control"
              name="body"
              id="body"
              rows="3"
              value={this.state.body}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default ComposeEmail;
