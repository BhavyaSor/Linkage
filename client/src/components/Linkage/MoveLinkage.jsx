import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  IconButton,
} from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Axios from '../../redux/apiCalls';
import { UtilContext } from '../Utils/UtilContext';
import { genErrorObject } from '../../shared/misc';
import FolderIcon from '@material-ui/icons/Folder';
import { defaultColor } from '../../shared/misc';
import { useDispatch, useSelector } from 'react-redux';
import { moveLinkage } from '../../redux/actions';

const MoveLinkage = ({ open, closeMoveModal, linkage }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const linkageState = useSelector((state) => state.linkage);
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const utils = useContext(UtilContext);
  const notificationRef = utils.notificationRef;
  const [move, setMoveData] = useState({ path: ['/'], items: [] });

  const setItems = (items) => {
    setMoveData((prev) => ({ ...prev, items }));
  };

  const pushToPath = (l_id) => {
    setMoveData((prev) => ({
      path: [...prev.path, l_id],
      items: prev.items,
    }));
  };

  const popFromPath = () => {
    setMoveData((prev) => {
      const path = [...prev.path];
      path.pop();
      return {
        path,
        items: [],
      };
    });
  };

  useEffect(() => {
    const parentId = move.path[move.path.length - 1];
    if (!parentId) return;
    const url =
      parentId === '/'
        ? '/api/linkage/'
        : `/api/linkage/${parentId}/subLinkages`;
    Axios.get(url)
      .then((data) => data.data)
      .then((data) => {
        data = data.filter((item) => item.category === 1);
        setItems(data);
      })
      .catch((err) => {
        if (notificationRef.current) {
          notificationRef.current.notify('error', genErrorObject(err).message);
        }
        popFromPath();
      });
  }, [move.path]);

  const handleMoveLinkage = () => {
    const l_Id = linkage._id;
    const toId = move.path[move.path.length - 1];
    console.log(l_Id, toId, 'dispatching...');
    dispatch(moveLinkage(l_Id, toId));
    closeMenu();
  };

  const closeMenu = () => {
    closeMoveModal();
    setMoveData({ items: [], path: ['/'] });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      scroll="paper"
      onClose={closeMenu}
      aria-labelledby="moveLinkage"
      PaperProps={{ style: { borderRadius: 20 } }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id={`moveLinkage-${linkage._id}`}>
        <>
          <IconButton onClick={popFromPath}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          Move {linkage.name}
        </>
      </DialogTitle>
      <DialogContent dividers={true}>
        <List>
          {move.items.map((item, idx) => (
            <ListItem
              button
              key={`${idx}-move-item`}
              onClick={() => pushToPath(item._id)}
            >
              <ListItemIcon>
                <FolderIcon htmlColor={item.color || defaultColor} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={closeMenu}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={handleMoveLinkage}
        >
          Move Here
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoveLinkage;
