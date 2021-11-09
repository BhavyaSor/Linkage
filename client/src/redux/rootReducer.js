import { combineReducers } from 'redux';
import {
  LinkageReducer,
  LinkagePathReducer,
  LinkageSharedDetails,
} from './linkage/LinkageReducer';
import { UserReducer } from './user/UserReducer';

const rootReducer = combineReducers({
  linkage: LinkageReducer,
  path: LinkagePathReducer,
  sharedDetails: LinkageSharedDetails,
  user: UserReducer,
});

export default rootReducer;
