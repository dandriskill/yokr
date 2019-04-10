import React from 'react';
import Motivator from './Motivator';
import Goals from './Goals';
import AddGoal from './AddGoal';

const Dashboard = ({
  user,
  name,
  motivator,
  isUpdatingMotivator,
  handleIsUpdatingMotivator,
  handleChangeMotivator,
  goals,
  handleAddGoal,
  handleDeleteGoal,
  handleChangeGoalStatus,
}) => (
  <section className="dashboard">
  <h3>{name && `${name}, your motivation is`}</h3>
    <Motivator
      updateMotivator={handleIsUpdatingMotivator}
      changeMotivator={handleChangeMotivator}
      isUpdating={isUpdatingMotivator}
      motivator={motivator}
    />
    <Goals
      user={user.uid}
      goals={goals}
      deleteGoal={handleDeleteGoal}
      changeGoalStatus={handleChangeGoalStatus}
    />
    <AddGoal addGoal={handleAddGoal} />
  </section>
);

export default Dashboard;
