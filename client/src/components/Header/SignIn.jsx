import React, { useState, useEffect } from 'react';
// prettier-ignore
import { Button, Dialog, useTheme, makeStyles, useMediaQuery, DialogTitle, DialogContent, DialogActions,Slide, Snackbar, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { ENV } from '../../shared/envVars';
import DevLoginForm from './DevLoginForm';

const SlideDownTransition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const navStyles = makeStyles((theme) => ({
  loginBtn: {
    marginLeft: 'auto',
  },
}));

const SignInComponent = (props) => {
  const user = useSelector((state) => state.user);
  const classes = navStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log('ENV', ENV);
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.loginBtn}
        onClick={() => props.handleModal(true)}
      >
        Login
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={props.isModalOpen}
        TransitionComponent={SlideDownTransition}
        onClose={() => props.handleModal(false)}
        aria-labelledby="signInModal"
        PaperProps={{ style: { borderRadius: 20 } }}
      >
        <DialogTitle id="signInModal">{'Sign In to Explore'}</DialogTitle>
        <DialogContent dividers={true}>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
              spacing={3}
              style={{ width: 'fit-content' }}
            >
              <Grid item>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Sign In with Google"
                  onSuccess={(resp) => {
                    props.signIn(resp);
                    props.handleModal(false);
                  }}
                  onFailure={(resp) => {
                    console.log(resp);
                    props.signIn(resp);
                    props.handleModal(false);
                  }}
                  cookiePolicy={'single_host_origin'}
                />
              </Grid>
            </Grid>
            {ENV === 'DEVELOPMENT' ? (
              <DevLoginForm user={user} signIn={props.signIn} />
            ) : null}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => props.handleModal(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignInComponent;
