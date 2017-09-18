import ObjectId from 'lib/ObjectId';
import createReducer from './createReducer';

const initialState = {
};


export const addFloor = (buildingId, name, description, notes, roomNameTemplate, seatNameTemplate) => ({
  type: 'floor/addFloor',
  buildingId,
  name,
  description,
  notes,
  nextRoomId: 1,
  id: new ObjectId().toString(),
});

export default createReducer(initialState, {
  'floor/addFloor': (state, action) => {
    const { id, roomNameTemplate, seatNameTemplate, name, notes, nextRoomId, description } = action;
    const floor = {
      name,
      id,
      notes,
      roomNameTemplate,
      seatNameTemplate,
      nextRoomId,
      description,
      rooms: [],
    };
    return {
      ...state,
      [id]: floor,
    };
  },
  'room/addRoom': (state, action) => {
    const { id, floorId } = action;
    const floor = state[floorId];
    return {
      ...state,
      [floorId]: {
        ...floor,
        nextRoomId: floor.nextRoomId + 1,
        rooms: [
          ...floor.floors,
          id,
        ],
      },
    };
  },
  'entities/load': (state, action) => {
    const { entities } = action;
    if (entities.floor) {
      return entities.floor;
    }
    return state;
  },

});
