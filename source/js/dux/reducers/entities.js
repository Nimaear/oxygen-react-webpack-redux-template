import { combineReducers } from 'redux';
import building from './building';
import floor from './floor';
import room from './room';
import seat from './seat';

export default combineReducers({
  building,
  floor,
  room,
  seat,
});
