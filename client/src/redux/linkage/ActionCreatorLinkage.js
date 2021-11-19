import * as ActionTypes from './ActionTypesLinkage';
import Axios from '../apiCalls';
import {
  sortByDateAdded,
  sortByDateModified,
  sortByName,
  genErrorObject,
} from '../../shared/misc';

const getLinkagesReq = () => {
  return {
    type: ActionTypes.GET_LINKAGES_REQ,
  };
};

const getLinkagesSuccess = (linkages) => {
  return {
    type: ActionTypes.GET_LINKAGES_SUCCESS,
    payload: linkages,
  };
};

const getLinkagesFailure = (error) => {
  return {
    type: ActionTypes.GET_LINKAGES_FAILURE,
    payload: error,
  };
};

const addLinkageReq = () => {
  return {
    type: ActionTypes.ADD_LINKAGE_REQ,
  };
};
const addLinkageSuccess = (linkage) => {
  return {
    type: ActionTypes.ADD_LINKAGE_SUCCESS,
    payload: linkage,
  };
};
const addLinkageFailure = (error) => {
  return {
    type: ActionTypes.ADD_LINKAGE_FAILURE,
    payload: error,
  };
};

const deleteLinkageReq = () => {
  return {
    type: ActionTypes.DELETE_LINKAGE_REQ,
  };
};
const deleteLinkageSuccess = (resp, LID) => {
  resp.lid = LID;
  return {
    type: ActionTypes.DELETE_LINKAGE_SUCCESS,
    payload: resp,
  };
};
const deleteLinkageFailure = (error) => {
  return {
    type: ActionTypes.DELETE_LINKAGE_FAILURE,
    payload: error,
  };
};

const editLinkageReq = () => {
  return {
    type: ActionTypes.EDIT_LINKAGE_REQ,
  };
};
const editLinkageSuccess = (resp) => {
  return {
    type: ActionTypes.EDIT_LINKAGE_SUCCESS,
    payload: resp,
  };
};
const editLinkageFailure = (error) => {
  return {
    type: ActionTypes.EDIT_LINKAGE_FAILURE,
    payload: error,
  };
};

const sortLinkages = (by, order = 1) => {
  let compartorFunc;
  by = by.toLowerCase();
  switch (by) {
    case 'name':
      compartorFunc = sortByName(order);
      break;
    case 'dateadded':
      compartorFunc = sortByDateAdded(order);
      break;
    case 'datemodified':
      compartorFunc = sortByDateModified(order);
      break;
    default:
      compartorFunc = sortByName(order);
  }
  return {
    type: ActionTypes.SORT_LINKAGES,
    payload: compartorFunc,
  };
};

const getLinkages =
  (parentLID = undefined) =>
  (dispatch) => {
    dispatch(getLinkagesReq());
    if (parentLID) {
      Axios.get(`/api/linkage/${parentLID}/subLinkages`)
        .then((data) => data.data)
        .then((data) => dispatch(getLinkagesSuccess(data)))
        .catch((err) => dispatch(getLinkagesFailure(genErrorObject(err))));
    } else {
      Axios.get(`/api/linkage/`)
        .then((data) => data.data)
        .then((data) => dispatch(getLinkagesSuccess(data)))
        .catch((err) => dispatch(getLinkagesFailure(genErrorObject(err))));
    }
  };

const addLinkage = (data) => (dispatch) => {
  dispatch(addLinkageReq());
  Axios.post(`/api/linkage`, data)
    .then((data) => data.data)
    .then((data) => dispatch(addLinkageSuccess(data)))
    .catch((err) => dispatch(addLinkageFailure(genErrorObject(err))));
};

const deleteLinkage = (LID) => (dispatch) => {
  dispatch(deleteLinkageReq());
  Axios.delete(`/api/linkage/${LID}`)
    .then((data) => data.data)
    .then((data) => dispatch(deleteLinkageSuccess(data, LID)))
    .catch((err) => dispatch(deleteLinkageFailure(genErrorObject(err))));
};

const editLinkage = (LID, newdata) => (dispatch) => {
  dispatch(editLinkageReq());
  Axios.put(`/api/linkage/${LID}`, newdata)
    .then((data) => data.data)
    .then((data) => dispatch(editLinkageSuccess(data)))
    .catch((err) => dispatch(editLinkageFailure(genErrorObject(err))));
};

export { getLinkages, addLinkage, deleteLinkage, editLinkage, sortLinkages };
