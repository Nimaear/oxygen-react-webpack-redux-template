import ObjectId from 'lib/ObjectId';
import createReducer from './createReducer';

const initialState = {
};


export const addRoom = (floorId, name, description) => ({
  type: 'room/addRoom',
  floorId,
  name,
  description,
  id: new ObjectId().toString(),
});

export default createReducer(initialState, {
  'room/addRoom': (state, action) => {
    const { id, name, description } = action;
    const room = {
      name,
      id,
      description,
      seats: [],
    };
    return {
      ...state,
      [id]: room,
    };
  },
  'seat/addSeat': (state, action) => {
    const { id, roomId } = action;
    const room = state[roomId];
    return {
      ...state,
      [roomId]: {
        ...room,
        seats: [
          ...room.seats,
          id,
        ],
      },
    };
  },
});
