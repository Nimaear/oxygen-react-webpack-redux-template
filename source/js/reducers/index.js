import { combineReducers } from 'redux';
import auth from 'reducers/auth';
import app from 'reducers/app';

export default combineReducers({
  auth,
  app,
});
