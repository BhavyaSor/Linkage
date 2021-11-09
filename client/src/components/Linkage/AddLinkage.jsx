import React, { useState, useEffect } from 'react';
// prettier-ignore
import { Tooltip, IconButton, Button, Dialog, useTheme, useMediaQuery, DialogTitle, DialogContent, DialogActions,CircularProgress, Fade } from '@material-ui/core';
import { useSelector, useStore } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';
import NewLinkageForm from './NewLinkageForm';

const FadeTransition = React.forwardRef((props, ref) => {
  return <Fade ref={ref} {...props} />;
});

const AddLinkage = (props) => {
  const theme = useTheme();
  const linkage = useSelector((state) => state.linkage);
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [addLnkForm, setLnkForm] = useState(null);

  const handleClick = (e) => {
    if (addLnkForm.submit) {
      addLnkForm.submit(e);
    }
  };

  const bindSubmitForm = (formProps) => {
    if (JSON.stringify(formProps) !== JSON.stringify(addLnkForm)) {
      setLnkForm(formProps);
    }
  };
  useEffect(() => {
    if (!linkage.loading && linkage.error === null) {
      addLnkForm?.setSubmitting(false);
    }
    return () => {
      addLnkForm?.setSubmitting(false);
    };
  }, [linkage]);

  return (
    <>
      <Tooltip title="Create Linkage">
        <IconButton
          aria-label="create-linkage"
          onClick={() => props.handleModal(true)}
        >
          <AddIcon color="inherit" />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen={fullScreen}
        open={props.isModalOpen}
        TransitionComponent={FadeTransition}
        onClose={() => props.handleModal(false)}
        aria-labelledby="addLinkage"
        PaperProps={{ style: { borderRadius: 20 } }}
      >
        <DialogTitle id="addLinkage">{'New Linkage'}</DialogTitle>
        <DialogContent dividers={true}>
          <NewLinkageForm
            parent={props.parent}
            linkage={linkage}
            addLinkage={props.addLinkage}
            bindSubmitForm={bindSubmitForm}
          />
        </DialogContent>
        <DialogActions style={{ padding: 16 }}>
          <Button
            autoFocus
            size="small"
            onClick={() => props.handleModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={
              addLnkForm?.isSubmitting && linkage.loading ? (
                <CircularProgress size={14} />
              ) : null
            }
            color="primary"
            size="small"
            onClick={handleClick}
            disabled={!addLnkForm?.dirty || addLnkForm?.isSubmitting}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddLinkage;
