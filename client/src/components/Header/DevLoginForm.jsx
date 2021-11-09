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
    devCode: Yup.string()
      .required('Developer Code is Required')
      .matches(/^\d+$/, 'Must be an integer'),
  }),
  mapPropsToValues: (props) => ({
    email: '',
    devCode: '',
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = { ...values };
    payload.devCode = parseInt(payload.devCode);
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
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-evenly"
        spacing={3}
      >
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              id="devCode"
              label="Developer Code"
              type="text"
              fullWidth
              error={touched.devCode && errors.devCode ? true : false}
              value={values.devCode}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.devCode ? errors.devCode : null}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          justify="flex-start"
          style={{ marginRight: 'auto' }}
        >
          <Button
            variant="contained"
            color="primary"
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
        </Grid>
      </Grid>
    </form>
  );
};

DevLoginForm.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default formikEnhancer(DevLoginForm);
