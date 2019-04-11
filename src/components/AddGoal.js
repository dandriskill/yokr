import React from 'react';
// import { database } from '../services/config';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { replace } from 'lodash';
import uuid from 'uuid/v4';

const initialValues = {
  goal: '',
};

const goalSchema = Yup.object().shape({
  goal: Yup
    .string()
    .min(2, 'Too short!')
    .typeError('Only normal characters allowed'),
});

const formatInput = input => replace(input.trim(), /"/g, "'");

const AddGoal = ({ addGoal }) => (
  <div className="add-goal">
    <Formik
      initialValues={initialValues}
      validationSchema={goalSchema}
      onSubmit={({ goal }, { resetForm, setSubmitting }) => {
        if (goal) {
          // Set in database here
          const yokr = {
            goal: formatInput(goal),
            complete: false,
            id: uuid(),
          };
          addGoal(yokr);
          setSubmitting(false);
          resetForm();
        }
      }}
    >
      <Form autoComplete="off">
        <div className="field-container">
          <div className="add-goal-field">
            <Field
              type="text"
              name="goal"
              component="input"
              className="goal-input"
              placeholder="Add specific visualizations here..."
            />
          </div>
          <button type="submit" className="black submit">
            Add
          </button>
        </div>
        <ErrorMessage name="goal" component="div" className="error-message" />
      </Form>
    </Formik>
  </div>
);

export default AddGoal;
