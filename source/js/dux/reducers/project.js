import ObjectId from 'lib/ObjectId';
import createReducer from './createReducer';

const initialState = {
};


export const addProject = (name, description, notes, buildingNameTemplate) => ({
  type: 'project/addProject',
  name,
  description,
  notes,
  id: new ObjectId().toString(),
  buildingNameTemplate,
  nextBuildingId: 1,
});

export default createReducer(initialState, {
  'project/addProject': (state, action) => {
    const { id, name, nextBuildingId, description, notes, buildingNameTemplate } = action;
    const project = {
      name,
      id,
      notes,
      buildingNameTemplate,
      description,
      nextBuildingId,
      buildings: [],
    };
    return {
      ...state,
      [id]: project,
    };
  },
  'building/addBuilding': (state, action) => {
    const { id, projectId } = action;
    const project = state[projectId];
    return {
      ...state,
      [projectId]: {
        ...project,
        nextBuildingId: project.nextBuildingId + 1,
        buildings: [
          ...project.buildings,
          id,
        ],
      },
    };
  },
  'building/deleteBuilding': (state, action) => {
    const { id, projectId } = action;
    const project = state[projectId];
    return {
      ...state,
      [projectId]: {
        ...project,
        buildings: project.buildings.filter(buildingId => id !== buildingId),
      },
    };
  },
  'entities/load': (state, action) => {
    const { entities } = action;
    if (entities.project) {
      return entities.project;
    }
    return state;
  },
});
