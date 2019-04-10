import React from 'react';
import { withRouter } from 'react-router-dom';
import eggy from '../assets/images/egg.svg';

const Nav = ({
  history,
  location: { pathname }
}) => (
  <nav className="nav">
    <div
      className="brand"
      onClick={() => history.push('/')}
    >
      <img src={eggy} alt="eggy" />
      <h2>Yokr.</h2>
    </div>
    <div>
      <button
        className="no-border"
        onClick={() => history.push('/philosophy')}
      >
        Philosophy
      </button>
      {pathname === "/login" ?
        <button
          className="ghost"
          onClick={() => history.push('/signup')}
        >
          Sign Up
        </button>
        :
        <button
          className="ghost"
          onClick={() => history.push('/login')}
        >
          Log In
        </button>
      }
    </div>
  </nav>
);

export default withRouter(Nav);
