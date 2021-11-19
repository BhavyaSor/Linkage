import React, { useState } from 'react';
import {
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import ForwardIcon from '@material-ui/icons/Forward';
import LinkIcon from '@material-ui/icons/Link';
import InfoIcon from '@material-ui/icons/Info';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NoteIcon from '@material-ui/icons/NoteOutlined';

import ViewDetails from './ViewDetails';
import ConfirmDelete from './ConfirmDelete';
import EditLinkage from './EditLinkage';
import { defaultColor } from '../../shared/misc';
import { useSelector } from 'react-redux';
import ShareLinkage from './ShareLinkage';
import MoveLinkage from './MoveLinkage';

const itemStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '220px',
    height: '50px',
    border: '1px solid',
    borderColor: theme.palette.grey[600],
    borderRadius: 7,
  },
  item: {
    marginRight: 'auto',
  },
  itemBtn: {
    textTransform: 'none',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: 16,
    maxWidth: '170px',
  },
  name: {
    marginLeft: theme.spacing(1),
  },
}));

const startIcon = (sharedWith, color, category) => {
  return category <= 1 ? (
    sharedWith.length === 0 ? (
      <FolderIcon htmlColor={color || defaultColor} />
    ) : (
      <FolderSharedIcon htmlColor={color || defaultColor} />
    )
  ) : category == 2 ? (
    <LinkIcon htmlColor={color || defaultColor} />
  ) : (
    <NoteIcon htmlColor={color || defaultColor} />
  );
};

const ItemLinkage = (props) => {
  const linkageLoading = useSelector((state) => state.linkage.loading);
  const userId = useSelector((state) => state.user.user?._id);
  const { sharedWith, category, name, color, _id, objData, parent, owner } =
    props.linkage;
  const css = itemStyles();

  const [anchorMenu, setAnchorMenu] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [shareItem, setShareItem] = useState(false);
  const [moveOpen, setMoveOpen] = useState(false);

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };
  const handleMenuOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleClick = () => {
    if (category <= 1) {
      props.routerHistory.push(`/linkage/${_id}`);
    } else if (category === 2) window.open(objData, '_blank', 'noopener');
    else {
      setViewDetails(true);
    }
  };

  const handleShareClick = (email, operation) => {
    props.shareLinkage(_id, email, operation);
    if (!linkageLoading) {
      setShareItem(true);
    }
  };

  const handleSharePaneClose = () => {
    setShareItem(false);
    props.getLinkages(parent);
  };

  const closeMoveModal = () => setMoveOpen(false);

  return (
    <>
      <Box display="flex" justifyContent="space-between" className={css.root}>
        <Box
          display="flex"
          justifyContent="flex-start"
          flex={1}
          className={css.item}
        >
          <Button
            startIcon={startIcon(sharedWith, color, category)}
            className={css.itemBtn}
            onClick={handleClick}
          >
            <Typography noWrap className={css.name}>
              {name}
            </Typography>
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-start">
          <IconButton aria-label="options" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
      <Menu
        id="options-menu"
        anchorEl={anchorMenu}
        keepMounted
        open={Boolean(anchorMenu)}
        onClose={handleMenuClose}
      >
        {userId == owner
          ? [
              <MenuItem
                onClick={() => {
                  setEditDetails(true);
                  handleMenuClose();
                }}
                key={'edit'}
              >
                <ListItemIcon style={{ minWidth: '40px' }}>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>,
              <MenuItem
                onClick={() => {
                  setMoveOpen(true);
                  handleMenuClose();
                }}
                key={'move'}
              >
                <ListItemIcon style={{ minWidth: '40px' }}>
                  <ForwardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Move" />
              </MenuItem>,
              <MenuItem
                onClick={() => {
                  setShareItem(true);
                  props.getSharingDetails(_id);
                  handleMenuClose();
                }}
                key={'share'}
              >
                <ListItemIcon style={{ minWidth: '40px' }}>
                  <PersonAddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Share" />
              </MenuItem>,
              <MenuItem
                onClick={() => {
                  setConfirmDelete(true);
                  handleMenuClose();
                }}
                key={'delete'}
              >
                <ListItemIcon style={{ minWidth: '40px' }}>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>,
            ]
          : null}
        <MenuItem
          onClick={() => {
            setViewDetails(true);
            props.getSharingDetails(_id);
            handleMenuClose();
          }}
        >
          <ListItemIcon style={{ minWidth: '40px' }}>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Details" />
        </MenuItem>
      </Menu>
      <ConfirmDelete
        deleteLinkage={props.deleteLinkage}
        linkageID={_id}
        confirmDelete={confirmDelete}
        closeConfirmPane={() => setConfirmDelete(false)}
      />
      <ViewDetails
        linkage={props.linkage}
        viewDetails={viewDetails}
        closeDetailsPane={() => setViewDetails(false)}
      />
      <EditLinkage
        editLinkage={props.editLinkage}
        linkageDetails={props.linkage}
        linkageLoading={linkageLoading}
        editDetailsOpen={editDetails}
        closeEditDetailsPane={() => setEditDetails(false)}
      />
      <ShareLinkage
        shareItemOpen={shareItem}
        shareLinkage={handleShareClick}
        linkageDetails={props.linkage}
        closeShareItemPane={handleSharePaneClose}
      />
      <MoveLinkage
        linkage={props.linkage}
        closeMoveModal={closeMoveModal}
        open={moveOpen}
      />
    </>
  );
};

export default ItemLinkage;
