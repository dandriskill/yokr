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
        <h2 title="Update motivator" onClick={() => updateMotivator()}>{motivator}</h2>
      </div>
  )
);

export default Motivator;
