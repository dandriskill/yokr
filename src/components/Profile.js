import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Profile = ({
  name,
  email,
  handleUpdateEmail,
  handleChangeName,
  history
}) => {
  const initialValues = {
    name,
    email,
  };

  const profileSchema = Yup.object().shape({
    name: Yup
      .string()
      .min(2, 'Too short!')
      .typeError('Only normal characters allowed')
      .required('Required'),
    email: Yup
      .string()
      .min(2, 'Too short!')
      .typeError('Only normal characters allowed')
      .required('Required'),
  });

  const trim = input => input.trim();

  return (
    <div className="profile">
      <h2>Edit Profile</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={profileSchema}
        onSubmit={({ name, email }, { resetForm, setSubmitting }) => {
          const n = trim(name);
          const em = trim(email);
          handleChangeName(n);
          handleUpdateEmail(em);
          setSubmitting(false);
          history.push('/dashboard');
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off" className="form">
            <div className="form-inner-container">
              <div className="field">
                <Field
                  type="name"
                  name="name"
                  component="input"
                  className="form-input"
                  placeholder="Name"
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
              <button type="submit" className="black">
                {isSubmitting ? 'Loading' : 'Save'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default withRouter(Profile);
