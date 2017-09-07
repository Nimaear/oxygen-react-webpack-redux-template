import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { outputFiles } from '../../../webpack/output-files';

const ServerHtml = ({ appHtml, dehydratedState, title, messages }) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' />

      <title>{ title }</title>

      <link rel='stylesheet' href={ `/${ outputFiles.css }` } />
    </head>
    <body>
      <div
        id='root'
        dangerouslySetInnerHTML={ { __html: appHtml } } // eslint-disable-line
      />
      <script
        dangerouslySetInnerHTML={ { __html: `var __INIT_STATE = ${ dehydratedState };` } } // eslint-disable-line
      />
      {messages && <script
        dangerouslySetInnerHTML={ {__html: `var __INIT_MESSAGES = ${ messages };` } } // eslint-disable-line
      />}
      <script type='text/javascript' src={ `/${ outputFiles.vendor }` } />
      <script type='text/javascript' src={ `/${ outputFiles.client }` } />
    </body>
  </html>
);

ServerHtml.propTypes = {
  appHtml: PropTypes.string,
  title: PropTypes.string,
  messages: PropTypes.string,
  dehydratedState: PropTypes.string,
};

const getServerHtml = (appHtml, dehydratedState = null, title, messages) => {
  return `<!doctype html>${ ReactDOMServer.renderToString(<ServerHtml appHtml={ appHtml } dehydratedState={ dehydratedState } title={ title } messages={ messages } />) }`;
};

export default getServerHtml;
