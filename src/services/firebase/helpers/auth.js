import { firebaseAuth, database } from '../config';

export const auth = (email, pw) =>
  firebaseAuth().createUserWithEmailAndPassword(email, pw);

export const logout = () =>
  firebaseAuth().signOut();

export const login = (email, pw) =>
  firebaseAuth().signInWithEmailAndPassword(email, pw);

export const updateEmail = (user, email) =>
  user.updateEmail(email)
    .then(() => console.log('Email successfully updated.'))
    .catch(() => console.log('Email update failed.'));

export const resetPassword = email =>
  firebaseAuth().sendPasswordResetEmail(email);

export const deleteUser = user => {
  user.delete().then(() => {
    database.ref('goals/' + user.uid).remove();
    database.ref('motivators/' + user.uid).remove();
    database.ref('names/' + user.uid).remove();
  }).catch(error => {
    alert(error);
  });
};
