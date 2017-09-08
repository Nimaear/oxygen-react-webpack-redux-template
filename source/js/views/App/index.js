import React, { Component } from 'react';
import Routes from 'config/routes';
import PropTypes from 'prop-types';
import i18n, { _l } from 'oxygen-i18n';
import Menu from 'components/Global/Menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from 'reducers/app';
import Button from 'components/UI/Button';
import Panel from 'components/UI/Panel';
import ListItem from 'components/UI/ListItem';
import Toggle from 'components/UI/Toggle';
import Radio from 'components/UI/Radio';
import RadioGroup from 'components/UI/RadioGroup';
import { fontSize, lineHeight } from 'style';

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


const css = oxygenCss({
  BODY: {
    backgroundColor: '#eee',
    fontSize: `${ fontSize(1) }`,
    lineHeight: `${ lineHeight(1) }`,
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

  state = {
    checked: true
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      const { locale } = nextProps;
      i18n.setLocale(locale, locale);
      this.forceUpdate();
    }
  }

  render() {
    const { setLocale } = this.props;
    const { checked } = this.state;
    return (
      <div className='App'>
        <Menu />
        <Panel padded>
          <ListItem color={'green'} secondary={'bye'} right={ '$30' }>
            Hello<br />
            Hello<br />
            Hello<br />
            Hello<br />
          </ListItem>
        </Panel>
        <Panel width={ 400 } padded>
          <Toggle color={ '#991111' } checked={checked} rightAlign fullWidth onChange={() => this.setState({ checked: !this.state.checked }) } >Hello</Toggle>
          <Toggle rightAlign fullWidth checked={true}>Hello</Toggle>
          <Toggle rightAlign fullWidth>Hello</Toggle>
          <Toggle rightAlign fullWidth>Hello</Toggle>
        </Panel>
        <Panel width={ 400 } padded>
          <RadioGroup value={ 3 }>
            <Radio fullWidth rightAlign value={ 1 } >1</Radio>
            <Radio fullWidth rightAlign value={ 2 } >2</Radio>
            <Radio fullWidth rightAlign value={ 3 } >3</Radio>
            <Radio color={'#440000'} fullWidth rightAlign value={ 4 } >4</Radio>
          </RadioGroup>
        </Panel>
        <Panel padded>
          <Button onClick={ () => setLocale('sv-SE') }>{_l`Swedish`}</Button>
          <Button onClick={ () => setLocale('en-US') } primary>{_l`English`}</Button>
          <Button onClick={ () => setLocale('en-US') } disabled>{_l`Disabled`}</Button>
        </Panel>
        <div className='Page'>
          <Routes />
        </div>
      </div>
    );
  }
}
