import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditGoal = ({ text, handleSubmit }) => {
  const initialValues = {
    goal: text,
  };

  const editGoalSchema = Yup.object().shape({
    goal: Yup
      .string()
      .min(2, 'Too short!')
      .typeError('Only normal characters allowed')
      .required('Required'),
  });

  const trim = input => input.trim();

  return (
    <div className="editGoal">
      <h3>Edit Goal</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={editGoalSchema}
        onSubmit={({ goal }, { resetForm, setSubmitting }) => {
          const g = trim(goal);
          setSubmitting(false);
          resetForm();
          handleSubmit(g);
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off" className="form">
            <div className="form-inner-container">
              <div className="field">
                <Field
                  type="text"
                  name="goal"
                  component="textarea"
                  className="edit-goal-input"
                  placeholder="Goal"
                />
                <ErrorMessage name="goal" component="div" className="error-message" />
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

export default EditGoal;
