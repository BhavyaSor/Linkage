import React, { useState, useEffect, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Slide,
  IconButton,
  useTheme,
  Box,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import SignInComponent from './SignIn';
import { connect, useSelector } from 'react-redux';
import { signIn, signOut } from '../../redux/actions';
import UserInfo from './UserInfo';
import { UtilContext } from '../Utils/UtilContext';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds, dev) => dispatch(signIn(creds, dev)),
    signOut: () => dispatch(signOut()),
  };
};

const SlideUpTransition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavBar = (props) => {
  const user = useSelector((state) => state.user);
  const [isModalOpen, setModalOpen] = useState(false);
  const utils = useContext(UtilContext);
  const notificationRef = utils.notificationRef;
  const theme = useTheme();

  useEffect(() => {
    if (!user.loading) {
      setModalOpen(false);
      let severity = user.error ? 'error' : user.user ? 'success' : 'info';
      let msg = user.error
        ? `${user.error.message} Try Again!`
        : user.user
        ? 'Successfull SignIn!'
        : 'Logout Successfull!';
      notificationRef.current.notify(severity, msg);
      // setAlertOpen(true);
    } else {
      // setAlertOpen(false);
    }
  }, [user]);

  const handleModalState = (newState) => {
    if (typeof newState === 'boolean') setModalOpen(newState);
  };

  return (
    <>
      <AppBar
        position="static"
        style={{ backgroundColor: theme.palette.primary.dark }}
        variant="elevation"
        elevation={props.elevation}
      >
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            style={{ width: '100%' }}
            alignItems="center"
          >
            <Box>
              <Link to="/">
                <img
                  src="assets/logo.png"
                  height="30px"
                  width="auto"
                  alt="Logo"
                ></img>
              </Link>
            </Box>
            <Box flex={1} display="flex" justifyContent="center">
              <Typography variant="h5" style={{ color: '#ffffff' }}>
                {props.pageTitle}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <IconButton
                onClick={() =>
                  utils.themeing.setThemeType((currTheme) =>
                    currTheme === 'light' ? 'dark' : 'light'
                  )
                }
              >
                {utils.themeing.themeType === 'light' ? (
                  <Brightness4Icon htmlColor={theme.palette.primary.light} />
                ) : (
                  <BrightnessHighIcon htmlColor={theme.palette.primary.light} />
                )}
              </IconButton>
              {user.user ? (
                <UserInfo signOut={props.signOut} />
              ) : (
                <SignInComponent
                  isModalOpen={isModalOpen}
                  handleModal={handleModalState}
                  signIn={props.signIn}
                />
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
