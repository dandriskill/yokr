import React from 'react';
import { withRouter } from 'react-router-dom';
import Day from './Day';
import eggy from '../assets/images/egg.svg';

const AuthNav = ({ history, day, logout }) => (
  <nav className="nav">
    <div
      className="brand"
      onClick={() => history.push('/')}
    >
      <div className="brand-inner">
        <img src={eggy} alt="eggy" />
        <h2>Yokr.</h2>
      </div>
      <Day day={day} />
    </div>
    <div className="nav-links">
      <button
        className="no-border"
        onClick={() => history.push('/dashboard')}
      >
        Dashboard
      </button>
      <button
        className="no-border"
        onClick={() => history.push('/profile')}
      >
        Profile
      </button>
      <button
        className="no-border"
        onClick={() => history.push('/philosophy')}
      >
        Philosophy
      </button>
      <button
        className="ghost"
        onClick={() => logout()}
      >
        Log Out
      </button>
    </div>
  </nav>
);

export default withRouter(AuthNav);
