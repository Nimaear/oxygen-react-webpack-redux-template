import createReducer from './createReducer';

const initialState = {
  buildings: []
};



export default createReducer(initialState, {
  'building/addBuilding': (state, action) => {
    const { id, name, description } = action;
    return {
      ...state,
      buildings: [ ...state.buildings, id],
    };
  },
});
