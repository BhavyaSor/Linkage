import * as ActionTypes from './ActionTypesUser';

const initialUserState = {
  loading: true,
  user: null,
  error: null,
};

export const UserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case ActionTypes.USER_SIGNIN_REQ:
      return { ...state, loading: true };

    case ActionTypes.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };

    case ActionTypes.USER_SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    case ActionTypes.USER_SIGNOUT:
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};