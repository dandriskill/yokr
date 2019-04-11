import { database } from '../config';

export const writeUserName = (userId, name) => {
  database.ref('names/' + userId).set({
    n: name,
  });
};

export const writeUserMotivator = (userId, motivator) => {
  database.ref('motivators/' + userId).set({
    m: motivator,
  });
};

export const writeUserGoals = (userId, goals) => {
  database.ref('goals/' + userId).set({
    g: goals,
  });
};

export const changeGoalStatus = (userId, goalIndex, status) => {
  const updates = {};
  updates['/goals/' + userId + '/g/' + goalIndex + '/complete'] = status;
  database.ref().update(updates);
}

export const newDay = (userId, goals) => {
  const updates = {};
  updates['/goals/' + userId + '/g/'] = goals;
  database.ref().update(updates);
}
