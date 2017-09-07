import createReducer from './createReducer';

const initialState = {
  locale: 'en-US',
};

export const setLocale = (locale) => ({
  type: 'app/setLocale',
  locale,
});

export default createReducer(initialState, {
  'app/setLocale': (state, action) => {
    return {
      ...state,
      locale: action.locale,
    };
  },
});
