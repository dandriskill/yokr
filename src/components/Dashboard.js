import React, { Fragment } from 'react';
import Motivator from './Motivator';
import Goals from './Goals';
import AddGoal from './AddGoal';
import loader from '../assets/images/loader.gif';

const Dashboard = ({
  day,
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
  handleEditGoal,
}) => (
  <section className="dashboard">
    {(name && motivator && goals) ? (
        <Fragment>
          <h3>{name},&nbsp;your motivation&nbsp;is</h3>
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
            editGoal={handleEditGoal}
          />
        </Fragment>
      ) : <img src={loader} alt="loader" className="loader" />
    }
    <AddGoal day={day} addGoal={handleAddGoal} />
  </section>
);

export default Dashboard;
