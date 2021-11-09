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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PublicIcon from '@material-ui/icons/Public';

const shareLinkageForm = withFormik({
  validationSchema: Yup.object().shape({
    addEmail: Yup.string()
      .email('Invalid Email Address')
      .when('operation', {
        is: 'add',
        then: Yup.string().required('Email Address required'),
      }),
  }),
  mapPropsToValues: (props) => ({
    addEmail: '',
    removeEmail: '',
    operation: '',
    email: '',
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const payload = { ...values };
    setSubmitting(false);
    props.shareLinkage(payload.email, payload.operation);
  },
  displayName: 'Share Linkage Form',
});

const ShareLinkage = (props) => {
  const {
    shareItemOpen,
    closeShareItemPane,
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
  const sharedDetails = useSelector((state) => state.sharedDetails);
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    if (!sharedDetails.loading) {
      props.setSubmitting(false);
    }
    return () => {
      props.setSubmitting(false);
    };
  }, [sharedDetails]);

  const handleDeleteClick = (email) => {
    setFieldValue('removeEmail', email);
    setFieldValue('email', email);
    setFieldValue('operation', 'remove');
    setFieldValue('addEmail', '');
    handleSubmit();
  };

  const handleAddClick = () => {
    setFieldValue('operation', 'add');
    setFieldValue('email', values.addEmail);
    handleSubmit();
  };

  const makePublic = (operation) => () => {
    props.shareLinkage('*', operation);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={shareItemOpen}
      onClose={() => {
        props.resetForm();
        closeShareItemPane();
      }}
      scroll="paper"
      aria-labelled-by="shareLinkage"
      PaperProps={{ style: { borderRadius: 20 } }}
    >
      <DialogTitle id="shareLinkage">
        Share Linkage : {linkageDetails.name}
      </DialogTitle>
      <DialogContent dividers={true}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="addEmail"
            label="Email Address"
            type="text"
            margin="dense"
            fullWidth
            error={touched.addEmail && errors.addEmail ? true : false}
            value={values.addEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.addEmail ? errors.addEmail : null}
          />
          <Button
            onClick={handleAddClick}
            size="small"
            variant="contained"
            startIcon={
              isSubmitting && sharedDetails.loading ? (
                <CircularProgress size={14} />
              ) : (
                <AddIcon />
              )
            }
            color="primary"
            disabled={!dirty || isSubmitting}
            style={{ marginTop: 16, marginBottom: 16, marginRight: 16 }}
          >
            Add
          </Button>
        </form>
        <List>
          <>
            <ListItem key={0} alignItems="flex-start">
              <Button
                onClick={
                  sharedDetails.isPublic
                    ? makePublic('remove')
                    : makePublic('add')
                }
                size="small"
                variant="outlined"
                endIcon={
                  isSubmitting && sharedDetails.loading ? (
                    <CircularProgress size={14} />
                  ) : (
                    <PublicIcon />
                  )
                }
                color="secondary"
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                {sharedDetails.isPublic
                  ? 'Reinstate Public Access'
                  : 'Make Public'}
              </Button>
            </ListItem>
            {sharedDetails.details
              ? sharedDetails.details.map((person, idx) => (
                  <ListItem key={idx} alignItems="flex-start">
                    <ListItemText
                      primary={person.name}
                      secondary={person.email}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteClick(person.email)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              : null}
          </>
        </List>
      </DialogContent>
      <DialogActions style={{ padding: '16px' }}>
        <Button size="small" onClick={closeShareItemPane}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default shareLinkageForm(ShareLinkage);
