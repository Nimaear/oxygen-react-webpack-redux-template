import ObjectId from 'lib/ObjectId';
import createReducer from './createReducer';

const initialState = {
};


export const addSeat = (roomId, name, description) => ({
  type: 'seat/addSeat',
  seatId,
  name,
  description,
  id: new ObjectId().toString(),
});

export default createReducer(initialState, {
  'seat/addSeat': (state, action) => {
    const { id, name, description } = action;
    const seat = {
      name,
      id,
      description,
      seats: [],
    };
    return {
      ...state,
      [id]: seat,
    };
  },
});
