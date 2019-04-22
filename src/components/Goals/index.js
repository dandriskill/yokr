import React from 'react';
import Goal from './Goal';

const Goals = ({ goals, deleteGoal, changeGoalStatus, editGoal }) => (
  <div className="goals">
    <ul className="goals-list">
      {(goals.length > 0) ?
        goals.map(goal =>
          <Goal
            key={goal.id}
            goal={goal}
            deleteGoal={deleteGoal}
            changeGoalStatus={changeGoalStatus}
            editGoal={editGoal}
          />
        ) : (
          <p style={{ 'textAlign': 'center' }}>Add some goals!</p>
        )
      }
    </ul>
  </div>
);

export default Goals;
