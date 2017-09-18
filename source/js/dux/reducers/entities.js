import { combineReducers } from 'redux';
import createReducer from './createReducer';
import project from './project';
import building from './building';
import floor from './floor';
import room from './room';
import seat from './seat';

export default combineReducers({
  project,
  building,
  floor,
  room,
  seat,
});
