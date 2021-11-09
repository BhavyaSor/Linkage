import React, { useEffect } from 'react';
import {
  Button,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { clearSharingDetails } from '../../redux/actions';

const itemStyles = makeStyles((theme) => ({
  listRoot: {
    width: '100%',
    maxWidth: '48ch',
  },
}));

function getDateTimeString(ISOString) {
  let date = new Date(ISOString);
  return `${date.toDateString()}, ${date.toLocaleTimeString()}`;
}

const ViewDetails = (props) => {
  const { category, name, objData, createdAt, updatedAt } = props.linkage;
  const dispatch = useDispatch();
  const css = itemStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const owner = useSelector((state) =>
    state.sharedDetails.details ? state.sharedDetails.details[0]?.email : ''
  );

  const handleCloseModal = () => {
    dispatch(clearSharingDetails());
    props.closeDetailsPane();
  };

  useEffect(() => {
    return () => dispatch(clearSharingDetails());
  }, []);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.viewDetails}
      scroll="paper"
      onClose={handleCloseModal}
      aria-labelledby="linkageInfo"
      PaperProps={{ style: { borderRadius: 20 } }}
    >
      <DialogTitle id="linkageInfo">{name}</DialogTitle>
      <DialogContent dividers={true}>
        <List className={css.listRoot}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Category"
              secondary={
                category == 0
                  ? 'Root Category'
                  : category == 1
                  ? 'Sub Category'
                  : 'Link'
              }
            />
          </ListItem>
          {category > 1 ? (
            <ListItem alignItems="flex-start">
              <ListItemText primary="Data" secondary={objData} />
            </ListItem>
          ) : null}
          <ListItem alignItems="flex-start">
            <ListItemText primary="Owner" secondary={owner} />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Created At"
              secondary={getDateTimeString(createdAt)}
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="Last Modified At"
              secondary={getDateTimeString(updatedAt)}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus size="small" onClick={handleCloseModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDetails;
