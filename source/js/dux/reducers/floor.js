import ObjectId from 'lib/ObjectId';
import createReducer from './createReducer';

const initialState = {
};


export const addFloor = (buildingId, floorIndex, name, description, notes, roomNameTemplate, seatNameTemplate) => ({
  type: 'floor/addFloor',
  buildingId,
  name,
  description,
  floorIndex,
  notes,
  roomIndex: 1,
  roomNameTemplate: roomNameTemplate || '%fd-%d',
  seatNameTemplate: seatNameTemplate || '%c',
  id: new ObjectId().toString(),
});

export default createReducer(initialState, {
  'floor/addFloor': (state, action) => {
    const { id, floorIndex, roomNameTemplate, seatNameTemplate, name, notes, roomIndex, description } = action;
    const floor = {
      name,
      id,
      notes,
      floorIndex,
      roomNameTemplate,
      seatNameTemplate,
      roomIndex,
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
        roomIndex: floor.roomIndex + 1,
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
