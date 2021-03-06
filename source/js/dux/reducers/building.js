import ObjectId from 'lib/ObjectId';
import createReducer from './createReducer';

const initialState = {
};


export const addBuilding = (projectId, buildindIndex, name, description, notes, floorNameTemplate, roomNameTemplate, seatNameTemplate) => ({
  type: 'building/addBuilding',
  projectId,
  name,
  notes,
  description,
  buildindIndex,
  floorIndex: 1,
  floorNameTemplate: floorNameTemplate || 'Floor %d',
  roomNameTemplate: roomNameTemplate || '%fd-%d',
  seatNameTemplate: seatNameTemplate || '%c',
  id: new ObjectId().toString(),
});

export const deleteBuilding = (projectId, id) => ({
  type: 'building/deleteBuilding',
  projectId,
  id,
});

export default createReducer(initialState, {
  'building/addBuilding': (state, action) => {
    const { id, name, buildingIndex, floorIndex, notes, floorNameTemplate, roomNameTemplate, seatNameTemplate, description } = action;
    const building = {
      name,
      id,
      buildingIndex,
      floorIndex,
      description,
      floorNameTemplate,
      roomNameTemplate,
      seatNameTemplate,
      notes,
      floors: [],
    };
    return {
      ...state,
      [id]: building,
    };
  },
  'building/deleteBuilding': (state, action) => {
    const { id } = action;
    const newState = {
      ...state,
    };
    delete newState[id];
    return newState;
  },
  'floor/addFloor': (state, action) => {
    const { id, buildingId } = action;
    const building = state[buildingId];
    return {
      ...state,
      [buildingId]: {
        ...building,
        floorIndex: building.floorIndex + 1,
        floors: [
          ...building.floors,
          id,
        ],
      },
    };
  },
  'entities/load': (state, action) => {
    const { entities } = action;
    if (entities.building) {
      return entities.building;
    }
    return state;
  },

});
