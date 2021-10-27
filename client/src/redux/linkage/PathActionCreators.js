import * as ActionTypes from './ActionTypesLinkage';
import Axios from '../apiCalls';

const getLinkagePathReq = () => {
  return {
    type: ActionTypes.GET_LINKAGE_PATH_REQ,
  };
};

const getLinkagePathSuccess = (pathDet) => {
  return {
    type: ActionTypes.GET_LINKAGE_PATH_SUCCESS,
    payload: pathDet,
  };
};

const getLinkagePathFailure = (error) => {
  return {
    type: ActionTypes.GET_LINKAGE_PATH_FAILURE,
    payload: error,
  };
};

const getLinkagePath =
  (LID = '') =>
  (dispatch) => {
    dispatch(getLinkagePathReq());
    Axios.get(`/api/linkage/path`, { params: { l_id: LID } })
      .then((data) => data.data)
      .then((data) => dispatch(getLinkagePathSuccess(data)))
      .catch((err) => dispatch(getLinkagePathFailure(err.message)));
  };

export { getLinkagePath };
