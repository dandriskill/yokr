import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { replace } from 'lodash';

class Update extends Component {
  componentDidMount() {
    document.getElementById('motivator-input').focus();
  }

  componentWillUnmount() {
    document.getElementById('motivator-input').blur();
  }

  formatInput = input => replace(input.trim(), /"/g, "'");

  render() {
    const {
      props: {
        changeMotivator,
        motivator,
      },
      formatInput,
    } = this;

    const initialValues = {
      motivator,
    };

    const motivatorSchema = Yup.object().shape({
      motivator: Yup
        .string()
        .typeError('Only normal characters allowed'),
    });

    return (
      <div className="motivator">
        <Formik
          initialValues={initialValues}
          validationSchema={motivatorSchema}
          onSubmit={({ motivator }, { resetForm, setSubmitting }) => {
            if (motivator) {
              // Set in database here
              changeMotivator(formatInput(motivator));
              setSubmitting(false);
              resetForm();
            }
          }}
        >
          <Form autoComplete="off">
            <Field
              type="text"
              name="motivator"
              component="input"
              id="motivator-input"
            />
            <ErrorMessage name="motivator" component="div" className="error-message" />
            <p id="motivator-instructions">Hit 'Enter' when done!</p>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default Update;
