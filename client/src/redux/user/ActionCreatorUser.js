import * as ActionTypes from './ActionTypesUser';
import Axios from '../apiCalls';
import localStorageService from '../../shared/localStorageService';
import { genErrorObject } from '../../shared/misc';

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

const signIn =
  (creds, devLogin = false) =>
  (dispatch) => {
    dispatch(signInUserReq());
    if (devLogin) {
      Axios.post(`/api/user/getTestToken`, creds)
        .then((data) => data.data)
        .then((data) => {
          localStorageService.setToken(data.auth_token);
          dispatch(signInUserSuccess(data.user));
        })
        .catch((err) => {
          dispatch(signInUserFailure(genErrorObject(err)));
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
        dispatch(signInUserFailure({ message: errMsg, status: 403 }));
      } else {
        Axios.post(`/api/user/googleLogin`, {
          gtoken: creds.tokenObj.id_token,
        })
          .then((data) => data.data)
          .then((data) => {
            localStorageService.setToken(data.auth_token);
            dispatch(signInUserSuccess(data.user));
          })
          .catch((err) => dispatch(signInUserFailure(genErrorObject(err))));
      }
    }
  };

const refreshUser = () => (dispatch) => {
  dispatch(signInUserReq());
  Axios.get('/api/user/refreshUser')
    .then((data) => data.data)
    .then((user) => dispatch(signInUserSuccess(user)))
    .catch((err) => dispatch(signInUserFailure(genErrorObject(err))));
};

const signOut = () => (dispatch) => {
  dispatch(signOutUser());
  // localStorage.removeItem('auth_token');
  localStorageService.clearToken();
};

export { signIn, signOut, refreshUser };
