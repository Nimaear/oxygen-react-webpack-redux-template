import ObjectId from 'lib/ObjectId';
import createReducer from './createReducer';

const initialState = {
};


export const addSeat = (roomId, seatIndex, name, description) => ({
  type: 'seat/addSeat',
  roomId,
  name,
  seatIndex,
  description,
  id: new ObjectId().toString(),
});

export default createReducer(initialState, {
  'seat/addSeat': (state, action) => {
    const { id, seatIndex, name, description } = action;
    const seat = {
      name,
      id,
      description,
      seatIndex,
      seats: [],
    };
    return {
      ...state,
      [id]: seat,
    };
  },
  'entities/load': (state, action) => {
    const { entities } = action;
    if (entities.seat) {
      return entities.seat;
    }
    return state;
  },

});
