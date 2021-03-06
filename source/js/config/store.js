import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'dev/logger';
import apiMiddleware from 'api/middleware';

import rootReducer from 'dux';

const isProduction = process.env.NODE_ENV === 'production';

// Remove if you are not using server rendering
let INIT_STATE = null;

// Remove if you are not using server rendering
try {
  INIT_STATE = __INIT_STATE; // eslint-disable-line no-undef
} catch (e) {
  // console.log('No dehydrated state'); // eslint-disable-line no-console
}

// Remove if you are not using server rendering
// if (INIT_STATE) {
//   INIT_STATE = JSON.parse(INIT_STATE);
// }


const persistToLocalStorage = store => {
  return next => action => {
    const { type } = action;
    if (type === 'app/save') {
      const state = store.getState();
      localStorage.setItem('__ENTITIES', JSON.stringify(state.entities));
    } else if (type === 'app/load') {
      const entities = JSON.parse(localStorage.getItem('__ENTITIES'));
      if (entities) {
        next({ type: 'entities/load', entities });
      }
    }
    return next(action);
  };
};

// Creating store
export default () => {
  let store = null;
  let middleware = null;

  if (isProduction) {
    // In production adding only thunk middleware
    middleware = applyMiddleware(thunk, apiMiddleware);
  } else {
    // In development mode beside thunk
    // logger and DevTools are added
    if (localStorage) {
      middleware = applyMiddleware(thunk, persistToLocalStorage, apiMiddleware, logger);
    } else {
      middleware = applyMiddleware(thunk, apiMiddleware, logger);
    }

    // Enable DevTools if browser extension is installed
    if (!process.env.SERVER_RENDER && window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
      middleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
      );
    }
  }

  // Add dehydrated state if any
  if (INIT_STATE) {
    // Remove if you are not using server rendering
    store = createStore(
      rootReducer,
      INIT_STATE,
      middleware
    );
  } else {
    store = createStore(
      rootReducer,
      middleware
    );
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../dux', () => {
      const nextRootReducer = require('../dux').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
