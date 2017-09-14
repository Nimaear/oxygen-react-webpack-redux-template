import createReducer from './createReducer';

const initialState = {
};

export const status = (data) => ({
  type: 'auth/status',
  apiCall: {
    checkCache: (params, state) => {
      if (state.auth.sessionId) {
        return state.auth;
      }
      return null;
    },
    data,
    apiMethod: 'auth',
    method: 'status',
    url: 'auth',
  },
});

export const login = (data) => ({
  type: 'auth/login',
  apiCall: {
    data,
    apiMethod: 'auth',
    method: 'login',
    url: 'auth',
  },
});

export const logout = (data) => ({
  type: 'auth/logout',
  apiCall: {
    data,
    apiMethod: 'logout',
    method: 'logout',
    url: 'auth',
  },
});


export default createReducer(initialState, {
  'auth/status': (state, action) => {
    if (action.data) {
      return {
        ...state,
        ...action.data,
      };
    }
    return state;
  },
  'auth/login': (state, action) => {
    if (action.data) {
      return {
        ...state,
        ...action.data,
      };
    }
    return state;
  },
  'auth/logout': (state, action) => {
    if (action.data) {
      return {
        ...state,
        ...action.data,
      };
    }
    return state;
  },
});
