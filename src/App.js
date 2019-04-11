import React, { Component } from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import SignUp from './components/SignUp';
import Nav from './components/Nav';
import AuthNav from './components/AuthNav';
import Landing from './components/Landing';
import Day from './components/Day';
import Dashboard from './components/Dashboard';
import Philosophy from './components/Philosophy';
import Profile from './components/Profile';
import Footer from './components/Footer';
import './assets/styles/App.css';
import loader from './assets/images/loader.gif';

import {
  writeUserName,
  writeUserMotivator,
  writeUserGoals,
  changeGoalStatus,
  newDay,
} from './services/firebase/helpers/db';
import {
  login,
  logout,
  updateEmail,
  resetPassword,
} from './services/firebase/helpers/auth';
import { firebaseAuth } from './services/firebase/config';
import { database } from './services/firebase/config';

class App extends Component {
  state = {
    authed: false,
    loading: true,
    day: moment().format('Do MMMM YYYY'),
    user: '',
    email: '',
    name: '',
    motivator: '',
    isUpdatingMotivator: false,
    goals: [],
  }

  componentDidMount() {
    // Check auth
    this.removeListener = firebaseAuth()
      .onAuthStateChanged(user => {
        if (user) {
          this.setState({
            authed: true,
            loading: false,
            user,
            email: user.email,
          });
          this.populateUserData(user.uid);
        } else {
          this.setState({
            authed: false,
            loading: false,
          });
        }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  populateUserData = (uid) => {
    const userId = uid;
    database.ref('names/' + userId)
      .once('value', snapshot => {
        const s = snapshot.val();
        if (s) {
          this.setState({ name: s.n });
        }
      });
    database.ref('motivators/' + userId)
      .once('value', snapshot => {
        const s = snapshot.val();
        if (s) {
          this.setState({ motivator: s.m });
        }
      });
    database.ref('goals/' + userId)
      .once('value', snapshot => {
        const s = snapshot.val();
        if (s) {
          const goals = s.g.filter(g => g.day === this.state.day);
          this.setState({ goals });
          newDay(userId, goals);
        }
      });
  }

  handleLogout = () => {
    this.setState({
      authed: false,
      loading: true,
      user: '',
      email: '',
      name: '',
      motivator: '',
      isUpdatingMotivator: false,
      goals: [],
    });
    logout();
  }

  handleUpdateEmail = email => {
    updateEmail(this.state.user, email);
    this.setState({ email });
  }

  handleIsUpdatingMotivator = () => {
    const { isUpdatingMotivator } = this.state;
    this.setState({
      isUpdatingMotivator: !isUpdatingMotivator,
    });
  }

  handleChangeMotivator = motivator => {
    this.setState(() => {
      writeUserMotivator(this.state.user.uid, motivator);
      return ({ motivator });
    }, () => setTimeout(
      () => this.handleIsUpdatingMotivator(), 200)
    );
  }

  handleAddGoal = goal => {
    this.setState(prevState => {
      const { goals } = ({
        goals: [
          ...prevState.goals,
          goal,
        ]
      });
      writeUserGoals(this.state.user.uid, goals);
      return ({ goals });
    });
  }

  handleDeleteGoal = id => {
    this.setState(prevState => {
      const { goals } = ({
        goals: [
          ...prevState.goals.filter(goal => goal.id !== id),
        ],
      });
      writeUserGoals(this.state.user.uid, goals);
      return ({ goals });
    });
  }

  handleChangeGoalStatus = (id, status) => {
    let goalIndex = this.state.goals.findIndex(i => i.id === id);
    this.setState(prevState => {
      const { goals } = ({
        goals: [
          ...prevState.goals.map(goal => {
            let g = goal;
            if (g.id === id) { g.complete = status }
            return g;
          }),
        ],
      });
      changeGoalStatus(this.state.user.uid, goalIndex, status);
      return ({ goals });
    });
  }

  handleChangeName = name => {
    writeUserName(this.state.user.uid, name);
    this.setState({ name });
  }

  render() {
    const {
      state: {
        authed,
        loading,
        day,
        user,
        email,
        name,
        motivator,
        isUpdatingMotivator,
        goals,
      },
      handleLogout,
      handleUpdateEmail,
      handleIsUpdatingMotivator,
      handleChangeMotivator,
      handleAddGoal,
      handleDeleteGoal,
      handleChangeGoalStatus,
      handleChangeName,
    } = this;

    return loading === true ? <img src={loader} alt="loader" className="loader" /> : (
      <div className="app">
        <Router>
          {authed ? <AuthNav day={day} logout={handleLogout} /> : <Nav />}
          <Day day={day} />
          <Switch>
            <PublicRoute
              exact
              path="/"
              component={Landing}
              authed={authed}
              deezProps={{}}
            />
            <PublicRoute
              path="/signup"
              component={SignUp}
              authed={authed}
              deezProps={{}}
            />
            <PublicRoute
              path="/login"
              component={Login}
              authed={authed}
              deezProps={{
                login,
              }}
            />
            <PublicRoute
              path="/reset-password"
              component={ResetPassword}
              authed={authed}
              deezProps={{
                resetPassword
              }}
            />
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
              authed={authed}
              deezProps={{
                day,
                user,
                name,
                motivator,
                isUpdatingMotivator,
                goals,
                handleIsUpdatingMotivator,
                handleChangeMotivator,
                handleAddGoal,
                handleDeleteGoal,
                handleChangeGoalStatus,
              }}
            />
            <PrivateRoute
              path="/profile"
              component={Profile}
              authed={authed}
              deezProps={{
                user,
                name,
                email,
                handleUpdateEmail,
                handleChangeName,
              }}
            />
            <Route
              exact
              path="/philosophy"
              component={Philosophy}
            />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
