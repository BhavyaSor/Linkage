import React, { useState, useEffect, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Snackbar,
  Slide,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import SignInComponent from './SignIn';
import { connect, useSelector } from 'react-redux';
import { signIn, signOut } from '../../redux/actions';
import UserInfo from './UserInfo';
import { NotificationContext } from '../Utils/Notification';

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

  const notificationRef = useContext(NotificationContext);

  useEffect(() => {
    if (!user.loading) {
      setModalOpen(false);
      let severity = user.error ? 'error' : user.user ? 'success' : 'info';
      let msg = user.error
        ? `${user.error} Try Again!`
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
      <AppBar position="static" variant="elevation" elevation={props.elevation}>
        <Toolbar>
          <Grid
            container
            direction="row"
            spacing={3}
            justify="space-between"
            alignItems="center"
          >
            <Grid
              item
              container
              justify="flex-start"
              alignItems="center"
              xs={3}
            >
              <Link to="/">
                <img
                  src="assets/svg/logo.svg"
                  height="30px"
                  width="auto"
                  alt="Logo"
                ></img>
              </Link>
            </Grid>
            <Grid item container justify="center" alignItems="center" xs={6}>
              <Typography variant="h5" style={{ color: '#ffffff' }}>
                {props.pageTitle}
              </Typography>
            </Grid>
            <Grid item container justify="flex-end" alignItems="center" xs={3}>
              {user.user ? (
                <UserInfo signOut={props.signOut} />
              ) : (
                <SignInComponent
                  isModalOpen={isModalOpen}
                  handleModal={handleModalState}
                  signIn={props.signIn}
                />
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
