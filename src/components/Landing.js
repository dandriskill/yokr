import React from 'react';
import { withRouter } from 'react-router-dom';

const Landing = ({ history }) => (
  <div className="landing">
    <div>
      <h1>A dead simple philosophy.</h1>
      <p>
        Organize your daily efforts and set goals with&nbsp;purpose.<br />
        Compatible with any workflow and totally&nbsp;free.
      </p>
      <button
        className="black"
        onClick={() => history.push('/signup')}
      >
        Sign Up
      </button>
    </div>
  </div>
);

export default withRouter(Landing);
