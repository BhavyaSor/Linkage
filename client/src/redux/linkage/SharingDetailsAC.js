import * as ActionTypes from './ActionTypesLinkage';
import Axios from '../apiCalls';

const getSharingDetailsReq = () => {
  return {
    type: ActionTypes.GET_SHARING_DETAILS_REQ,
  };
};

const getSharingDetailsSuccess = (details) => {
  return {
    type: ActionTypes.GET_SHARING_DETAILS_SUCCESS,
    payload: details,
  };
};

const getSharingDetailsFailure = (error) => {
  return {
    type: ActionTypes.GET_SHARING_DETAILS_FAILURE,
    payload: error,
  };
};

const clearSharingDetails = () => {
  return {
    type: ActionTypes.CLEAR_SHARING_DETAILS,
  };
};

const shareLinkageReq = () => {
  return {
    type: ActionTypes.SHARE_LINKAGE_REQ,
  };
};

const shareLinkageSuccess = (details, operation) => {
  return {
    type: ActionTypes.SHARE_LINKAGE_SUCCESS,
    payload: { details, operation },
  };
};

const shareLinkageFailure = (error) => {
  return {
    type: ActionTypes.SHARE_LINKAGE_FAILURE,
    payload: error,
  };
};

const getSharingDetails = (LID) => (dispatch) => {
  dispatch(getSharingDetailsReq());
  Axios.get(`/api/linkage/${LID}/share`)
    .then((data) => data.data)
    .then((data) => dispatch(getSharingDetailsSuccess(data)))
    .catch((err) =>
      dispatch(getSharingDetailsFailure(err?.response?.data || err.message))
    );
};

const shareLinkage = (LID, withEmail, operation) => (dispatch) => {
  dispatch(shareLinkageReq());
  Axios.put(
    `/api/linkage/${LID}/share`,
    { email: withEmail },
    {
      params: {
        operation,
      },
    }
  )
    .then((data) => data.data)
    .then((data) => dispatch(shareLinkageSuccess(data, operation)))
    .catch((err) =>
      dispatch(shareLinkageFailure(err?.response?.data || err.message))
    );
};

export { getSharingDetails, clearSharingDetails, shareLinkage };
