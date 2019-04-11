import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  email: '',
};

const resetPasswordSchema = Yup.object().shape({
  email: Yup
    .string()
    .min(2, 'Too short!')
    .typeError('Only normal characters allowed')
    .required('Required'),
});

const trim = input => input.trim();

const ResetPassword = ({ resetPassword, history }) => (
  <div className="login">
    <h1>Reset Password</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={resetPasswordSchema}
      onSubmit={({ email }, { resetForm, setSubmitting }) => {
        const em = trim(email);
        resetPassword(em)
          .then(() => {
            alert('Reset email sent!');
            setSubmitting(false);
            resetForm();
            history.push('/login');
          }).catch((error) => {
            alert(error);
            setSubmitting(false);
            resetForm();
          });
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
            <button type="submit" className="black">
              {isSubmitting ? 'Loading' : 'Reset'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default withRouter(ResetPassword);
