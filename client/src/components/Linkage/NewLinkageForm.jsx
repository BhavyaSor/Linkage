import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography, Box } from '@material-ui/core';
import { withFormik } from 'formik';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import * as Yup from 'yup';

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .strict(true)
      .trim('Name must not be Empty')
      .required('Name is Required'),
    objData: Yup.string().when('category', {
      is: 3,
      then: Yup.string().required('Must enter Data'),
    }),
  }),
  mapPropsToValues: (props) => ({
    name: '',
    objData: '',
    category: 1,
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = { ...values };
    if (props.parent !== 'my-linkage') {
      payload.parent = props.parent;
    }
    if (!payload.parent) payload.category--;
    props.addLinkage(payload);
  },
  displayName: 'New Linkage Form',
});

const NewLinkageForm = (props) => {
  const {
    handleSubmit,
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    dirty,
    setSubmitting,
    submitForm,
  } = props;

  useEffect(() => {
    const levitateProps = {
      submit: submitForm,
      dirty: dirty,
      isSubmitting: isSubmitting,
      setSubmitting: setSubmitting,
    };
    props.bindSubmitForm(levitateProps);
  }, [submitForm, dirty, isSubmitting, setSubmitting]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        style={{ minWidth: '350px' }}
      >
        <Box p={1}>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            error={touched.name && errors.name ? true : false}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.name ? errors.name : null}
          />
        </Box>
        {values.category >= 2 ? (
          <Box p={1}>
            <TextField
              margin="dense"
              id="objData"
              label="Link or Note"
              type="text"
              fullWidth
              error={touched.objData && errors.objData ? true : false}
              value={values.objData}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.objData ? errors.objData : null}
            />
          </Box>
        ) : null}
        <Box p={1}>
          <ToggleButtonGroup
            value={values.category}
            exclusive
            aria-label="category"
            onChange={(e, val) => props.setFieldValue('category', val)}
          >
            <ToggleButton value={1} aria-label="Category" size="small">
              <Typography>Category</Typography>
            </ToggleButton>
            <ToggleButton value={2} aria-label="link" size="small">
              <Typography>Link</Typography>
            </ToggleButton>
            <ToggleButton value={3} aria-label="link" size="small">
              <Typography>Note</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </form>
  );
};

// NewLinkageForm.propTypes = {
//   addLinkage: PropTypes.func.isRequired,
// };

export default formikEnhancer(NewLinkageForm);
