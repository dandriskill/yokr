import React from 'react';

const AreYouSure = ({ deleteUser, closeModal }) => (
  <div className="areYouSure">
    <h3>You're about to delete your entire account.</h3>
    <p>Are you sure you want to do this?</p>
    <button
      onClick={() => deleteUser()}
      className="black"
    >
      Yes
    </button>
    <button
      onClick={() => closeModal()}
      className="black"
    >
      No
    </button>
  </div>
);

export default AreYouSure;
