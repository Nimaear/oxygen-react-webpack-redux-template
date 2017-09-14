import { combineReducers } from 'redux';
import auth from './reducers/auth';
import app from './reducers/app';
import entities from './reducers/entities';
import currentEntities from './reducers/currentEntities';

export default combineReducers({
  auth,
  app,
  entities,
  currentEntities,
});
