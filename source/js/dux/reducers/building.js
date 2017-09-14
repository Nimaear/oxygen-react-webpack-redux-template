import ObjectId from 'lib/ObjectId';
import createReducer from './createReducer';

const initialState = {
};


export const addBuilding = (name, description) => ({
  type: 'building/addBuilding',
  name,
  description,
  id: new ObjectId().toString(),
});

export default createReducer(initialState, {
  'building/addBuilding': (state, action) => {
    const { id, name, description } = action;
    const building = {
      name,
      id,
      description,
      floors: [],
    };
    return {
      ...state,
      [id]: building,
    };
  },
  'floor/addFloor': (state, action) => {
    const { id, buildingId } = action;
    const building = state[buildingId];
    return {
      ...state,
      [buildingId]: {
        ...building,
        floors: [
          ...building.floors,
          id,
        ],
      },
    };
  },
});
