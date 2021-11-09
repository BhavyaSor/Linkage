import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import ColoredRadioGrp from './ColoredRadioGrp';
import { defaultColor } from '../../shared/misc';
import { availableColors } from '../../shared/misc';

const editFormikForm = withFormik({
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
  mapPropsToValues: ({ linkageDetails }) => ({
    name: linkageDetails.name,
    objData: linkageDetails.objData || '',
    color: linkageDetails.color || defaultColor,
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = { ...values };
    props.editLinkage(props.linkageDetails._id, payload);
    if (!props.linkageLoading) {
      setSubmitting(false);
    }
  },
  displayName: 'Edit Linkage Form',
});

const EditLinkage = (props) => {
  const {
    editDetailsOpen,
    closeEditDetailsPane,
    handleSubmit,
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    dirty,
    linkageDetails,
    setFieldValue,
  } = props;
  const theme = useTheme();
  const linkage = useSelector((state) => state.linkage);
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    return () => {
      props.setSubmitting(false);
    };
  }, []);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={editDetailsOpen}
      onClose={() => {
        props.resetForm();
        closeEditDetailsPane();
      }}
      aria-labelled-by="editLinkage"
      PaperProps={{ style: { borderRadius: 20 } }}
    >
      <DialogTitle id="editLinkage">Edit Linkage</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers={true}>
          <TextField
            id="name"
            label="Name"
            type="text"
            margin="dense"
            fullWidth
            error={touched.name && errors.name ? true : false}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.name ? errors.name : null}
          />
          {linkageDetails.category > 1 ? (
            <TextField
              id="objData"
              label="Link or Note"
              type="text"
              margin="dense"
              fullWidth
              error={touched.objData && errors.objData ? true : false}
              value={values.objData}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.objData ? errors.objData : null}
            />
          ) : null}
          <ColoredRadioGrp
            availableColors={availableColors}
            color={values.color}
            setColor={setFieldValue}
          />
        </DialogContent>
        <DialogActions style={{ padding: '16px' }}>
          <Button size="small" onClick={closeEditDetailsPane}>
            Cancel
          </Button>
          <Button
            type="submit"
            size="small"
            variant="contained"
            startIcon={
              isSubmitting && linkage.loading ? (
                <CircularProgress size={14} />
              ) : null
            }
            color="primary"
            disabled={!dirty || isSubmitting}
          >
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default editFormikForm(EditLinkage);
