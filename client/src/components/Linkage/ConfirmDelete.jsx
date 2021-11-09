import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const confirmationStyles = makeStyles((theme) => ({
  btnContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    justifyContent: 'center',
    margin: 8,
  },
  btn: {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

const ConfirmDelete = (props) => {
  const css = confirmationStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleDelete = () => {
    props.deleteLinkage(props.linkageID);
    props.closeConfirmPane();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.confirmDelete}
      scroll="paper"
      onClose={props.closeConfirmPane}
      aria-labelledby="confirmDelete"
      PaperProps={{ style: { borderRadius: 20 } }}
    >
      <DialogTitle id="confirmDelete">Are you sure ?</DialogTitle>
      <DialogActions className={css.btnContainer}>
        <Button
          variant="contained"
          className={css.btn}
          size="small"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button autoFocus size="small" onClick={props.closeConfirmPane}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
