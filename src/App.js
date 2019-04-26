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
import Dashboard from './components/Dashboard';
import EditGoal from './components/EditGoal';
import Philosophy from './components/Philosophy';
import Profile from './components/Profile';
import AreYouSure from './components/AreYouSure';
import Footer from './components/Footer';
import Modal from 'react-modal';
import './assets/styles/App.css';
import loader from './assets/images/loader.gif';

import {
  writeUserName,
  writeUserMotivator,
  writeUserGoals,
  changeGoalStatus,
  editGoal,
  newDay,
} from './services/firebase/helpers/db';
import {
  login,
  logout,
  updateEmail,
  resetPassword,
  deleteUser,
} from './services/firebase/helpers/auth';
import { firebaseAuth } from './services/firebase/config';
import { database } from './services/firebase/config';

Modal.setAppElement('#root');

class App extends Component {
  state = {
    authed: false,
    verified: false,
    loading: true,
    day: moment().format('Do MMMM YYYY'),
    user: '',
    email: '',
    name: '',
    motivator: '',
    isUpdatingMotivator: false,
    goals: [],
    modalIsOpen: false,
    modalContent: '',
    currentGoal: null,
  }

  componentDidMount() {
    this.removeListener = firebaseAuth()
      .onAuthStateChanged(user => {
        if (user) {
          if(!user.emailVerified){
            user.sendEmailVerification().then(() => {
              console.log("Email verification sent to user.");
            });
          }
          this.setState({
            authed: true,
            verified: user.emailVerified,
            loading: false,
            user,
            email: user.email,
          });
          this.populateUserData(user.uid);
          // this.interval = setInterval(
          //   () => {
          //     this.populateUserData(user.uid);
          //   },
          //   1000
          // );
        } else {
          this.setState({
            authed: false,
            loading: false,
          });
        }
    });
  }

  componentWillUnmount () {
    // clearInterval(this.interval);
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
    }, () => setTimeout(() => this.handleIsUpdatingMotivator(), 200));
  }

  handleAddGoal = goal => {
    this.setState(prevState => {
      const goals = [
        ...prevState.goals,
        goal,
      ];
      writeUserGoals(this.state.user.uid, goals);
      return ({ goals });
    });
  }

  handleDeleteGoal = id => {
    this.setState(prevState => {
      const goals = prevState.goals.filter(goal => goal.id !== id);
      writeUserGoals(this.state.user.uid, goals);
      return ({ goals });
    });
  }

  handleChangeGoalStatus = (id, status) => {
    let goalIndex = this.state.goals.findIndex(i => i.id === id);
    this.setState(prevState => ({
      goals: prevState.goals.map(goal => {
        let g = goal;
        if (g.id === id) { g.complete = status }
        return g;
      }),
    }), () => changeGoalStatus(this.state.user.uid, goalIndex, status));
  }

  handleEditGoal = id => {
    this.setState({
      modalIsOpen: true,
      modalContent: 'edit goal',
      currentGoal: id,
    });
  }

  handleSubmitGoalEdit = edit => {
    const id = this.state.currentGoal;
    const goalIndex = this.state.goals.findIndex(i => i.id === id);
    this.setState(prevState => ({
      goals: prevState.goals.map(goal => {
        let g = goal;
        if (g.id === id) { g.goal = edit }
        return g;
      }),
      modalIsOpen: false,
      modalContent: '',
      currentGoal: null,
    }), () => editGoal(this.state.user.uid, goalIndex, edit));
  }

  handleChangeName = name => {
    writeUserName(this.state.user.uid, name);
    this.setState({ name });
  }

  handleConfirmDeleteUser = () => {
    this.setState({
      modalIsOpen: true,
      modalContent: 'confirm delete user',
    });
  }

  handleDeleteUser = () => {
    deleteUser(this.state.user);
    this.setState({ modalIsOpen: false });
    logout();
  }

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
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
        modalIsOpen,
        modalContent,
        currentGoal,
      },
      handleLogout,
      handleUpdateEmail,
      handleIsUpdatingMotivator,
      handleChangeMotivator,
      handleAddGoal,
      handleDeleteGoal,
      handleChangeGoalStatus,
      handleEditGoal,
      handleSubmitGoalEdit,
      handleChangeName,
      handleConfirmDeleteUser,
      handleDeleteUser,
      handleCloseModal,
    } = this;

    const modalStyles = {
      content : {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    return loading ? <img src={loader} alt="loader" className="loader" /> : (
      <div className="app">
        <Modal
          isOpen={modalIsOpen}
          style={modalStyles}
          contentLabel="Content"
          onRequestClose={handleCloseModal}
          shouldCloseOnOverlayClick={true}
        >
          {modalContent === 'confirm delete user' &&
            <AreYouSure
              deleteUser={handleDeleteUser}
              closeModal={handleCloseModal}
            />
          }
          {modalContent === 'edit goal' &&
            <EditGoal
              text={goals.find(e => e.id === currentGoal).goal}
              handleSubmit={handleSubmitGoalEdit}
            />
          }
        </Modal>
        <Router>
          {authed ? <AuthNav day={day} logout={handleLogout} /> : <Nav />}
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
                handleEditGoal,
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
                handleConfirmDeleteUser,
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
