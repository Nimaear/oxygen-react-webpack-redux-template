import React, { Component } from 'react';
import Routes from 'config/routes';
import PropTypes from 'prop-types';
import i18n, { _l } from 'oxygen-i18n';
import Menu from 'components/Global/Menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from 'reducers/app';

addTranslations({
  'en-US': {
    'English': 'English',
    'Swedish': 'Swedish',
  },
  'sv-SE': {
    'English': 'Engelsk',
    'Swedish': 'Svensk',
  },
});

@connect(state => ({
  locale: state.app.locale,
}), dispatch => ({
  setLocale: bindActionCreators(appActions.setLocale, dispatch),
}))
export default class App extends Component {
  static propTypes = {
    locale: PropTypes.string,
    setLocale: PropTypes.func,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      const { locale } = nextProps;
      i18n.setLocale(locale, locale);
      this.forceUpdate();
    }
  }

  render() {
    const { setLocale } = this.props;
    return (
      <div className='App'>
        <Menu />
        <button onClick={ () => setLocale('sv-SE') }>{_l`Swedish`}</button>
        <button onClick={ () => setLocale('en-US') }>{_l`English`}</button>
        <div className='Page'>
          <Routes />
        </div>
      </div>
    );
  }
}
