import ObjectId from 'lib/ObjectId';
import createReducer from './createReducer';

const initialState = {
};


export const addRoom = (floorId, name, description, notes, seatNameTemplate) => ({
  type: 'room/addRoom',
  floorId,
  name,
  description,
  notes,
  seatNameTemplate,
  nextSeatId: 1,
  id: new ObjectId().toString(),
});

export default createReducer(initialState, {
  'room/addRoom': (state, action) => {
    const { id, nextSeatId, name, seatNameTemplate, description, notes } = action;
    const room = {
      name,
      id,
      description,
      nextSeatId,
      notes,
      seatNameTemplate,
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
        nextSeatId: room.nextSeatId + 1,
        seats: [
          ...room.seats,
          id,
        ],
      },
    };
  },
  'entities/load': (state, action) => {
    const { entities } = action;
    if (entities.room) {
      return entities.room;
    }
    return state;
  },

});
