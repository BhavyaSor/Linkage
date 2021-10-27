import { combineReducers } from 'redux';
import {
  LinkageReducer,
  LinkagePathReducer,
  LinkageSharedDetails,
} from './linkage/LinkageReducer';
import { UserReducer } from './user/UserReducer';
import { CiphageReducer } from './ciphage/CiphageReducer';
import { urlReducer } from './urlShort/urlReducer';

const rootReducer = combineReducers({
  linkage: LinkageReducer,
  path: LinkagePathReducer,
  sharedDetails: LinkageSharedDetails,
  user: UserReducer,
  ciphage: CiphageReducer,
  urls: urlReducer,
});

export default rootReducer;
