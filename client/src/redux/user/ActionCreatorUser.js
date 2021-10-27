import * as ActionTypes from './ActionTypesUser';
import Axios from '../apiCalls';
import localStorageService from '../../shared/localStorageService';

const signInUserReq = () => {
  return {
    type: ActionTypes.USER_SIGNIN_REQ,
  };
};

const signInUserSuccess = (user) => {
  return {
    type: ActionTypes.USER_SIGNIN_SUCCESS,
    payload: user,
  };
};

const signInUserFailure = (error) => {
  return {
    type: ActionTypes.USER_SIGNIN_FAILURE,
    payload: error,
  };
};

const signOutUser = () => {
  return {
    type: ActionTypes.USER_SIGNOUT,
  };
};

const signIn = (creds, devLogin = false) => (dispatch) => {
  dispatch(signInUserReq());
  if (devLogin) {
    Axios.post(`/api/user/getTestToken`, creds)
      .then((data) => data.data)
      .then((data) => {
        localStorageService.setToken(data.auth_token);
        dispatch(signInUserSuccess(data.user));
      })
      .catch((err) => {
        dispatch(signInUserFailure(err?.response?.data));
      });
  } else {
    // google Login
    if (creds.error) {
      let errMsg = creds.error;
      errMsg = errMsg.split('_');
      errMsg =
        errMsg
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
          )
          .join(' ') + '.';
      dispatch(signInUserFailure(errMsg));
    } else {
      Axios.post(`/api/user/googleLogin`, {
        gtoken: creds.tokenObj.id_token,
      })
        .then((data) => data.data)
        .then((data) => {
          localStorageService.setToken(data.auth_token);
          dispatch(signInUserSuccess(data.user));
        })
        .catch((err) => dispatch(signInUserFailure(err.message)));
    }
  }
};

const signOut = () => (dispatch) => {
  dispatch(signOutUser());
  // localStorage.removeItem('auth_token');
  localStorageService.clearToken();
};

export { signIn, signOut };
