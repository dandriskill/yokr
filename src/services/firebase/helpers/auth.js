import { firebaseAuth } from '../config';

export const auth = (email, pw) =>
  firebaseAuth().createUserWithEmailAndPassword(email, pw);

export const logout = () =>
  firebaseAuth().signOut();

export const login = (email, pw) =>
  firebaseAuth().signInWithEmailAndPassword(email, pw);

// export const updateEmail = (user, email) =>
//   user.updateEmail(email);

export const resetPassword = email =>
  firebaseAuth().sendPasswordResetEmail(email);
