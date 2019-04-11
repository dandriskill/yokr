import React from 'react';
import { login } from '../services/firebase/helpers/auth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const signUpSchema = Yup.object().shape({
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
});

const trim = input => input.trim();

const Login = () => (
  <div className="login">
    <h1>Log In</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={({ email, password }, { resetForm, setSubmitting }) => {
        const em = trim(email);
        const pw = trim(password);
        login(em, pw)
          .catch(e => alert('Incorrect email or password.'));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off" className="form">
          <div className="form-inner-container">
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
            <button type="submit" className="black">
              {isSubmitting ? 'Loading' : 'Log In'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default Login;
