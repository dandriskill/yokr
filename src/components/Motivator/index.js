import React from 'react';
import Update from './Update';

const Motivator = ({
  updateMotivator,
  changeMotivator,
  isUpdating,
  motivator,
}) => (
  isUpdating ? (
      <Update
        changeMotivator={changeMotivator}
        motivator={motivator}
      />
    ) : (
      <div className="motivator">
        <h1
          className="motivator-text"
          title="Update motivator"
          onClick={() => updateMotivator()}
        >
          {motivator}
        </h1>
      </div>
  )
);

export default Motivator;
