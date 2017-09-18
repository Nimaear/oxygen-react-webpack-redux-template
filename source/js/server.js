import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { Provider } from 'react-redux';
import expressSession from 'express-session';
import { matchPath } from 'react-router-dom';
import api from 'api';
import 'babel-polyfill';
import configureStore from 'config/store';
import getServerHtml from 'config/server-html';
import { routes } from 'config/routes';
import Server from 'views/Server';
import path from 'path';
import fs from 'fs';
import { status } from 'dux/reducers/auth';
import mongoDbSession from 'connect-mongodb-session';

const MongoDBStore = mongoDbSession(expressSession);
const sessionStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017/coursio',
  collection: 'sessions',
});
const app = express();
const hostname = 'localhost';
const port = 8080;

app.use('/client', express.static('build/client'));

// require('../../tmp/bundle.css');
require('../styles/reset.css');


const messages = fs.readFileSync(
  path.resolve('build', 'messages.json'),
  'utf-8'
);

app.use(expressSession({
  store: sessionStore,
  secret: 'All the cats in the world',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

function fetchData(dispatch, fetches, routes, url) {
  routes.some(route => {
    const match = matchPath(url, route);

    if (match) {
      if (route.childRoutes) {
        fetchData(dispatch, fetches, route.childRoutes, url);
      }
      const {
        component,
      } = route;
      if (component && component.fetchData) {
        component.fetchData.forEach(fetch => {
          if (typeof fetch === 'function') {
            fetches.push(dispatch(fetch(match.params || {})));
          }
        });
      }
    }
  });
}

const fetchComponentData = (dispatch, routes, url) => {
  const fetches = [];
  fetchData(dispatch, fetches, routes, url);
  fetches.push(dispatch(status()));
  return fetches.reverse();
};

app.use((req, res) => {
  // Creates empty store for each request
  const store = configureStore();
  // Dehydrates the state
  const dehydratedState = JSON.stringify(store.getState());

  const {
    url,
    session,
  } = req;

  if (session) {
    api.setSession(session);
    if (session.token) {
      api.setToken(session.token);
    }
  }
  const promises = fetchComponentData(store.dispatch, routes, url);

  Promise.all(promises).then(data => {
    const state = store.getState();
    let title = 'PlaceMe';
    if (state && state.entities && state.entities.store) {
      const storeName = Object.keys(state.entities.store)[0];
      const storeDetails = state.entities.store[storeName];
      // console.log(storeDetails)
      if (storeDetails && storeDetails.owner) {
        title = storeDetails.owner.name;
      }
    }

    // Context is passed to the StaticRouter and it will attach data to it directly
    const context = {};

    const appHtml = ReactDOMServer.renderToString(
      <Provider store={ store }>
        <Server location={ req.url } context={ context } />
      </Provider>
    );

    const serverHtml = getServerHtml(appHtml, dehydratedState, title, messages);

    // Context has url, which means `<Redirect>` was rendered somewhere
    if (context.url) {
      res.redirect(301, context.url);
    } else {
      // We're good, send the response
      res.status(context.status || 200).send(serverHtml);
    }
  }, error => {
    console.error(error); // eslint-disable-line
  }).catch(error => {
    console.error(error); // eslint-disable-line
    res.send(`<!DOCTYPE html>${ error }`);
  });
  // TODO how to handle 50x errors?
});

// Start listening
app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line
  } else {
    console.info(`\n★★ Listening on port ${ port }. Open up http://${ hostname }:${ port }/ in your browser.\n`); // eslint-disable-line
  }
});
