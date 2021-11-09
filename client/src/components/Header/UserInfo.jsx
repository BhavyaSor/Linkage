import React, { useState } from 'react';
import {
  Avatar,
  ButtonBase,
  makeStyles,
  Menu,
  MenuItem,
  Popover,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const avatarStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const UserInfo = (props) => {
  const classes = avatarStyles();
  const user = useSelector((state) => state.user.user);
  const [anchorMenu, setAnchorMenu] = useState(null);

  let names = user.name.split(' ');
  let initials = names[0].charAt(0).toUpperCase();
  if (names.length > 1)
    initials += names[names.length - 1].charAt(0).toUpperCase();

  const handleClose = () => {
    setAnchorMenu(null);
  };
  const handleOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  return (
    <>
      <ButtonBase
        disableRipple
        disableTouchRipple
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        {user.imageUrl ? (
          <Avatar variant="rounded" alt={user.name} src={user.imageUrl} />
        ) : (
          <Avatar variant="rounded" className={classes.avatar}>
            {initials}
          </Avatar>
        )}
      </ButtonBase>
      <Popover
        id="profile-menu"
        anchorEl={anchorMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        open={Boolean(anchorMenu)}
        onClose={handleClose}
      >
        <MenuItem onClick={props.signOut}>Logout</MenuItem>
      </Popover>
    </>
  );
};

export default UserInfo;
