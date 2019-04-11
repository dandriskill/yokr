import React, { Fragment } from 'react';
import Motivator from './Motivator';
import Goals from './Goals';
import AddGoal from './AddGoal';
import loader from '../assets/images/loader.gif';

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
    {user ?
      (<Fragment>
        <h3>{name && `${name}, your motivation is`}</h3>
        {motivator ?
          (<Motivator
              updateMotivator={handleIsUpdatingMotivator}
              changeMotivator={handleChangeMotivator}
              isUpdating={isUpdatingMotivator}
              motivator={motivator}
            />
          ) : <img src={loader} alt="loader" className="loader" />
        }
        <Goals
          user={user.uid}
          goals={goals}
          deleteGoal={handleDeleteGoal}
          changeGoalStatus={handleChangeGoalStatus}
        />
        <AddGoal addGoal={handleAddGoal} />
      </Fragment>) : <img src={loader} alt="loader" className="loader" />
    }
  </section>
);

export default Dashboard;
