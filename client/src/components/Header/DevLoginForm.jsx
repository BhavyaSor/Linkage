import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { withFormik } from 'formik';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import * as Yup from 'yup';

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid Email address')
      .required('Email is Required'),
  }),
  mapPropsToValues: (props) => ({
    email: '',
    devCode: '',
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = { ...values };
    props.signIn(payload, true);
    if (!props.user.loading) {
      setSubmitting(false);
    }
  },
  displayName: 'Developer Form',
});

const DevLoginForm = (props) => {
  const user = useSelector((state) => state.user);
  const {
    handleSubmit,
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    dirty,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        margin="dense"
        id="email"
        label="Email Address"
        type="email"
        fullWidth
        error={touched.email && errors.email ? true : false}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.email}
      />

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '12px' }}
        startIcon={
          user.loading && isSubmitting ? (
            <CircularProgress size={14} />
          ) : (
            <DeveloperModeIcon />
          )
        }
        type="submit"
        disabled={!dirty || isSubmitting}
      >
        Dev Login
      </Button>
    </form>
  );
};

DevLoginForm.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default formikEnhancer(DevLoginForm);
