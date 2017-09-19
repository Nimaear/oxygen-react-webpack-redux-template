import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import 'babel-polyfill';

import configureStore from 'config/store';
import Client from 'views/Client';

import es6Promise from 'es6-promise';
import 'isomorphic-fetch';
import { addMessages } from 'oxygen-i18n';
// import 'semantic-ui-css/semantic.min.css';
import '../../tmp/bundle.css';
import '../styles/reset.css';
import '../styles/semantic.paper.css';

const SERVER_RENDER = process.env.SERVER_RENDER === 'true';

es6Promise.polyfill();

const store = configureStore();

// require('../../tmp/bundle.css');
// require('../styles/reset.css');

if (!SERVER_RENDER) {
  if (global && global.__INIT_MESSAGES) { // eslint-disable-line no-underscore-dangle
    addMessages(global.__INIT_MESSAGES); // eslint-disable-line no-underscore-dangle
    // delete global.__INIT_MESSAGES; // eslint-disable-line no-underscore-dangle
  } else {
    const messages = require('../../tmp/messages.json'); // eslint-disable-line global-require
    addMessages(messages);
  }
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Render app
render(Client);

if (module.hot) {
  module.hot.accept('../../tmp/messages.json', () => {
    const nextMessages = require('../../tmp/messages.json'); // eslint-disable-line global-require
    addMessages(nextMessages);
    const NewClient = require('./views/Client/index').default; // eslint-disable-line global-require

    render(NewClient);
  });

  module.hot.accept('./views/Client/', () => {
    const NewClient = require('./views/Client/index').default; // eslint-disable-line global-require

    render(NewClient);
  });
}
