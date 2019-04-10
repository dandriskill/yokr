import React from 'react';
import Goal from './Goal';

const Goals = ({ goals, deleteGoal, changeGoalStatus }) => (
  <div className="goals">
    <ul className="goals-list">
      {goals.map(goal =>
        <Goal
          key={goal.id}
          goal={goal}
          deleteGoal={deleteGoal}
          changeGoalStatus={changeGoalStatus}
        />
      )}
    </ul>
  </div>
);

export default Goals;
