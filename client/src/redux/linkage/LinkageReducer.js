import * as ActionTypes from './ActionTypesLinkage';

const initialLinkageState = {
  loading: true,
  linkages: [],
  error: null,
};

export const LinkageReducer = (state = initialLinkageState, action) => {
  let new_linkages, index;
  switch (action.type) {
    // GET LINKAGES
    case ActionTypes.GET_LINKAGES_REQ:
      return { ...state, loading: true };
    case ActionTypes.GET_LINKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        linkages: action.payload,
        error: null,
      };
    case ActionTypes.GET_LINKAGES_FAILURE:
      return {
        ...state,
        loading: false,
        linkages: [],
        error: action.payload,
      };

    // ADD LINKAGE
    case ActionTypes.ADD_LINKAGE_REQ:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.ADD_LINKAGE_SUCCESS:
      new_linkages = [...state.linkages];
      new_linkages.push(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
        linkages: new_linkages,
      };
    case ActionTypes.ADD_LINKAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        // linkages: [],
      };

    // DELETE LINKAGE
    case ActionTypes.DELETE_LINKAGE_REQ:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.DELETE_LINKAGE_SUCCESS:
      new_linkages = [...state.linkages];
      console.log(action.payload);
      new_linkages = new_linkages.filter(
        (linkage) => linkage._id != action.payload.lid
      );
      return {
        ...state,
        linkages: new_linkages,
        loading: false,
        error: null,
      };
    case ActionTypes.DELETE_LINKAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // EDIT LINKAGE
    case ActionTypes.EDIT_LINKAGE_REQ:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.EDIT_LINKAGE_SUCCESS:
      new_linkages = [...state.linkages];
      index = new_linkages.findIndex((ele) => ele._id == action.payload._id);
      new_linkages[index] = action.payload;
      return {
        ...state,
        loading: false,
        error: null,
        linkages: new_linkages,
      };
    case ActionTypes.EDIT_LINKAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ActionTypes.MOVE_LINKAGE_REQ:
      return {
        ...state,
        loading: true,
      };

    case ActionTypes.MOVE_LINKAGE_SUCCESS:
      new_linkages = [...state.linkages];
      new_linkages = new_linkages.filter((lg) => lg._id !== action.payload);
      return { ...state, linkages: new_linkages, error: null, loading: false };

    case ActionTypes.MOVE_LINKAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // SORT LINKAGES
    case ActionTypes.SORT_LINKAGES:
      new_linkages = [...state.linkages];
      new_linkages = new_linkages.sort(action.payload);
      return {
        ...state,
        linkages: new_linkages,
      };

    default:
      return state;
  }
};

const initialLinkagePathState = {
  loading: true,
  owner: true,
  path: [],
  error: null,
};

export const LinkagePathReducer = (state = initialLinkagePathState, action) => {
  switch (action.type) {
    case ActionTypes.GET_LINKAGE_PATH_REQ:
      return { ...state, loading: true };

    case ActionTypes.GET_LINKAGE_PATH_SUCCESS:
      return {
        ...state,
        loading: false,
        owner: action.payload.owner,
        path: action.payload.path,
        error: null,
      };

    case ActionTypes.GET_LINKAGE_PATH_FAILURE:
      return {
        ...state,
        loading: false,
        owner: true,
        path: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialSharedDetails = {
  loading: true,
  error: null,
  details: null,
  isPublic: false,
};

export const LinkageSharedDetails = (state = initialSharedDetails, action) => {
  let new_details, isPublic;
  switch (action.type) {
    // GET SHARING DETAILS
    case ActionTypes.GET_SHARING_DETAILS_REQ:
      return { ...state, loading: true };
    case ActionTypes.GET_SHARING_DETAILS_SUCCESS:
      isPublic = false;
      new_details = action.payload.sharedWith;
      isPublic = new_details.find((det) => det.email === '*') || false;
      new_details = new_details.filter((det) => det.email !== '*');
      return {
        ...state,
        loading: false,
        error: null,
        details: new_details,
        // details: action.payload.sharedWith,
        isPublic: isPublic,
      };
    case ActionTypes.GET_SHARING_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        details: null,
        isPublic: null,
      };

    case ActionTypes.CLEAR_SHARING_DETAILS:
      return {
        ...state,
        details: null,
        isPublic: false,
      };

    // UPDATE SHARING DETAILS
    case ActionTypes.SHARE_LINKAGE_REQ:
      return { ...state, loading: true };
    case ActionTypes.SHARE_LINKAGE_SUCCESS:
      new_details = state.details;
      if (action.payload.operation === 'add') {
        if (action.payload.details.email === '*') {
          isPublic = true;
        } else {
          isPublic = state.isPublic;
          new_details.push(action.payload.details);
        }
        // isPublic = action.payload.details.email === '*' ? true : state.isPublic;
      } else {
        isPublic =
          action.payload.details.email === '*' ? false : state.isPublic;
        new_details = new_details.filter(
          (user) => user._id != action.payload.details._id
        );
      }
      return {
        ...state,
        loading: false,
        details: new_details,
        error: null,
        isPublic: isPublic,
      };
    case ActionTypes.SHARE_LINKAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
