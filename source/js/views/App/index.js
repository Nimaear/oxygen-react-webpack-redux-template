import React, { Component } from 'react';
import Routes from 'config/routes';
import PropTypes from 'prop-types';
import i18n from 'oxygen-i18n';
import { Units, fontSize, lineHeight } from 'style';
import MainMenu from 'components/Global/MainMenu';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from 'semantic-ui-react';
import * as appActions from 'dux/reducers/app';
import { bindActionCreators } from 'redux';

addTranslations({
  'en-US': {
  },
  'sv-SE': {
  },
});

const css = oxygenCss({
  BODY: {
    backgroundColor: '#eee',
    fontSize: `${ fontSize(1) }`,
    lineHeight: `${ lineHeight(1) }`,
  },
  page: {
    width: Units.keyline * 16,
    margin: '7em auto 0 auto',
  },
});

@withRouter
@connect(state => ({
  locale: state.app.locale,
}), dispatch => ({
  load: bindActionCreators(appActions.load, dispatch),
}))
export default class App extends Component {
  static propTypes = {
    locale: PropTypes.string,
    load: PropTypes.func,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locale && this.props.locale !== nextProps.locale) {
      const { locale } = nextProps;
      i18n.setLocale(locale, locale);
      this.forceUpdate();
    }
  }

  componentWillMount() {
    const { load } = this.props;
    load();
  }

  render() {
    return (
      <div>
        <MainMenu />
        <div className={ css.page }>
          <Container fluid>
            <Routes />
          </Container>
        </div>
      </div>
    );
  }
}
