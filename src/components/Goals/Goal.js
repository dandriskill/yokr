import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faTrashAlt, faEdit } from '@fortawesome/free-regular-svg-icons';

library.add(
  faTrashAlt,
  faCircle,
  faCheckCircle,
  faEdit,
);

class Goal extends Component {
  state = { checkHover: false };

  handleToggleCheckHover = val =>
    this.setState({ checkHover: val });

  render() {
    const {
      props: {
        goal: { goal, id, complete },
        deleteGoal,
        changeGoalStatus,
        editGoal,
      },
      state: {
        checkHover,
      },
      handleToggleCheckHover,
    } = this;
    return (
      <li className="goal">
        <p>{goal}</p>
        <div className="goal-button-group">
          {complete ?
            <button
              className="small no-border"
              title="Mark incomplete"
              onClick={() => {
                handleToggleCheckHover(false);
                changeGoalStatus(id, false);
              }}
            >
              <FontAwesomeIcon icon="check-circle" size="lg" />
            </button>
            :
            <button
              className="small no-border"
              title="Mark complete"
              onClick={() => changeGoalStatus(id, true)}
              onMouseEnter={() => handleToggleCheckHover(true)}
              onMouseLeave={() => handleToggleCheckHover(false)}
            >
              {checkHover ?
                <FontAwesomeIcon icon="check-circle" size="lg" />
                : <FontAwesomeIcon icon={['far', 'circle']} size="lg" />
              }
            </button>
          }
          <button
            className="small no-border text-lightweight"
            title="Edit goal"
            onClick={() => editGoal(id)}
          >
            <FontAwesomeIcon icon={['far', 'edit']} size="lg" />
          </button>
          <button
            className="small no-border"
            title="Delete goal"
            onClick={() => deleteGoal(id)}
          >
            <FontAwesomeIcon icon={['far', 'trash-alt']} size="lg" />
          </button>
        </div>
      </li>
    );
  }
}

export default Goal;
