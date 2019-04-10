import React from 'react';
import { auth } from '../services/firebase/helpers/auth';
import {
  writeUserName,
  writeUserMotivator,
  writeUserGoals,
} from '../services/firebase/helpers/db';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { replace } from 'lodash';
import uuid from 'uuid/v4';

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const signUpSchema = Yup.object().shape({
  name: Yup
    .string()
    .typeError('Only normal characters allowed')
    .required('Required'),
  email: Yup
    .string()
    .min(2, 'Too short!')
    .typeError('Only normal characters allowed')
    .required('Required'),
  password: Yup
    .string()
    .min(2, 'Too short!')
    .typeError('Only normal characters allowed')
    .required('Required'),
  passwordConfirmation: Yup
    .string()
    .min(2, 'Too short!')
    .typeError('Only normal characters allowed')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const formatInput = input => replace(input.trim(), /"/g, "'");
const trim = input => input.trim();

const SignUp = () => (
  <div className="signup">
    <h1>Sign Up</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={({ email, password, name }, { resetForm, setSubmitting }) => {
        const em = trim(email);
        const pw = trim(password);
        const n = formatInput(name);
        auth(em, pw)
          .then(({ user: { uid } }) => {
            writeUserName(uid, n);
            writeUserMotivator(uid, "Type your primary motivator here...");
            writeUserGoals(uid, [{
              goal: 'Example goal.',
              complete: false,
              id: uuid(),
            }]);
          })
          .catch(e => console.log(e));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off" className="form">
          <div className="form-inner-container">
            <div className="field">
              <Field
                id="name"
                type="text"
                name="name"
                component="input"
                className="form-input"
                placeholder="First Name"
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div className="field">
              <Field
                type="email"
                name="email"
                component="input"
                className="form-input"
                placeholder="Email"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="field">
              <Field
                type="password"
                name="password"
                component="input"
                className="form-input"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="field">
              <Field
                type="password"
                name="passwordConfirmation"
                component="input"
                className="form-input"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="passwordConfirmation" component="div" className="error-message" />
            </div>
            <button type="submit" className="black">
              {isSubmitting ? 'Loading' : 'Sign Up'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default SignUp;
