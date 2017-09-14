import ObjectId from 'lib/ObjectId';
import createReducer from './createReducer';

const initialState = {
};


export const addFloor = (buildingId, name, description) => ({
  type: 'floor/addFloor',
  buildingId,
  name,
  description,
  id: new ObjectId().toString(),
});

export default createReducer(initialState, {
  'floor/addFloor': (state, action) => {
    const { id, name, description } = action;
    const floor = {
      name,
      id,
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
        ...floorg,
        rooms: [
          ...floor.floors,
          id,
        ],
      },
    };
  },
});
