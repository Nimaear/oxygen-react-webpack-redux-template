import createReducer from './createReducer';

const initialState = {
  locale: 'en-US',
};

export const setLocale = (locale) => ({
  type: 'app/setLocale',
  locale,
});

export const save = () => ({
  type: 'app/save',
});

export const load = () => ({
  type: 'app/load',
});

export default createReducer(initialState, {
  'entities/save': (state, action) => {
    localStorage.setItem('__ENTITIES', JSON.stringify(state));
    return state;
  },
  'entities/load': (state, action) => {
    return JSON.parse(localStorage.getItem('__ENTITIES'));
  },
  'app/setLocale': (state, action) => {
    return {
      ...state,
      locale: action.locale,
    };
  },
});
