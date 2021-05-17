import { combineReducers } from 'redux';

import app from './app';
import profile from './profile';

export default combineReducers({
  app,
  profile,
});