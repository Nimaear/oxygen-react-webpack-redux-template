import React, { Component } from 'react';
import Routes from 'config/routes';
import PropTypes from 'prop-types';
import i18n from 'oxygen-i18n';
import { Units, fontSize, lineHeight } from 'style';
import MainMenu from 'components/Global/MainMenu';

import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'

addTranslations({
  'en-US': {
    'English': 'English',
    'Swedish': 'Swedish',
    'Home': 'Home',
  },
  'sv-SE': {
    'English': 'Engelsk',
    'Swedish': 'Svensk',
    'Home': 'Home',
  },
});

const css = oxygenCss({
  BODY: {
    backgroundColor: '#eee',
    fontSize: `${ fontSize(1) }`,
    lineHeight: `${ lineHeight(1) }`,
  },
  floor: {
    padding: `${ Units.base }px 0`,
  },
});

export default class App extends Component {
  static propTypes = {
    locale: PropTypes.string,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      const { locale } = nextProps;
      i18n.setLocale(locale, locale);
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div>
        <MainMenu />

        <Container text style={{ marginTop: '7em' }}>
          <Routes />
        </Container>

      </div>
    );
  }
}
