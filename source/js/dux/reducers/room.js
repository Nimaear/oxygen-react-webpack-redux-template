import ObjectId from 'lib/ObjectId';
import createReducer from './createReducer';

const initialState = {
};


export const addRoom = (floorId, roomIndex, name, description, notes, seatNameTemplate) => ({
  type: 'room/addRoom',
  floorId,
  name,
  description,
  notes,
  roomIndex,
  seatNameTemplate,
  seatIndex: 1,
  id: new ObjectId().toString(),
});

export default createReducer(initialState, {
  'room/addRoom': (state, action) => {
    const { id, roomIndex, seatIndex, name, seatNameTemplate, description, notes } = action;
    const room = {
      name,
      id,
      description,
      seatIndex,
      notes,
      roomIndex,
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
        seatIndex: room.seatIndex + 1,
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
