import React, { Component } from 'react';
import Routes from 'config/routes';
import PropTypes from 'prop-types';
import i18n, { _l } from 'oxygen-i18n';
import Menu from 'components/Global/Menu';


addTranslations({
  'en-US': {
    '{0}': '{0}',
    'Courses {0}': 'Courses {0}',
    'No results found': 'No results found',
    'Store look and feel': 'Store look and feel',
  },
});

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  render() {
    const a = 4;
    return (
      <div className='App'>
        <Menu />
        {_l`Courses ${ a }`}
        <div className='Page'>
          <Routes />
        </div>
      </div>
    );
  }
}
