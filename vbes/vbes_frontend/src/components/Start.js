import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Start extends Component {
  render() {
    return (
      <div>
        <Link to="/home" className="nav-link">
          Start App
        </Link>
      </div>
    );
  }
}

export default Start;
