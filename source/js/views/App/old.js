import React, { Component } from 'react';
import Routes from 'config/routes';
import PropTypes from 'prop-types';
import i18n, { _l } from 'oxygen-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from 'dux/reducers/app';
import * as buildingActions from 'dux/reducers/building';
import { getBuildings } from 'dux/selectors/building';
import Button from 'components/UI/Button';
import Panel from 'components/UI/Panel';
import ListItem from 'components/UI/ListItem';
import Toggle from 'components/UI/Toggle';
import TextField from 'components/UI/TextField';
import TextArea from 'components/UI/TextArea';
import Menu from 'components/UI/Menu';
import MenuItem from 'components/UI/MenuItem';
import Radio from 'components/UI/Radio';
import RadioGroup from 'components/UI/RadioGroup';
import SelectField from 'components/UI/SelectField';
import { fontSize, lineHeight } from 'style';

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
});


@connect(state => ({
  locale: state.app.locale,
  buildings: getBuildings(state),
}), dispatch => ({
  setLocale: bindActionCreators(appActions.setLocale, dispatch),
  addBuilding: bindActionCreators(buildingActions.addBuilding, dispatch),
}))
export default class App extends Component {
  static propTypes = {
    locale: PropTypes.string,
    setLocale: PropTypes.func,
  }

  state = {
    checked: true,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale) {
      const { locale } = nextProps;
      i18n.setLocale(locale, locale);
      this.forceUpdate();
    }
  }

  addBuilding = () => {
    const { addBuilding } = this.props;
    addBuilding('Oz', 'Building of Öz');
  };

  render() {
    const { setLocale, buildings } = this.props;
    const { checked } = this.state;
    return (
      <div className='App'>
        <Panel padded>
          {buildings.map(building => {
            return (
              <ListItem
                right={ building.floors.length }
                secondary={ building.description }
                key={ building.id }
              >
                {building.name}
              </ListItem>
            );
          })}
        </Panel>
        <Panel padded>
          <Menu>
            <MenuItem disabled>Test</MenuItem>
            <MenuItem>Test</MenuItem>
            <MenuItem>Test</MenuItem>
            <MenuItem>Test</MenuItem>
          </Menu>
        </Panel>
        <Panel width={ 400 } padded>
          <TextField fullWidth />
          <TextArea fullWidth />
          <SelectField
            fullWidth
            items={ [
              [1, _l`Test 1`],
              [2, _l`Test 2`],
              [3, _l`Test 3`],
              [4, _l`Test 4`],
            ] }
          >
            <MenuItem disabled>Test</MenuItem>
            <MenuItem>Test</MenuItem>
            <MenuItem>Test</MenuItem>
            <MenuItem>Test</MenuItem>
          </SelectField>
        </Panel>
        <Panel width={ 400 } padded>
          <Toggle checked={checked} rightAlign fullWidth onChange={() => this.setState({ checked: !this.state.checked }) } >Hello</Toggle>
          <Toggle color={ '#991111' } checked={checked} rightAlign fullWidth onChange={() => this.setState({ checked: !this.state.checked }) } >Hello</Toggle>
          <Toggle checked={checked} rightAlign fullWidth>Hello</Toggle>
          <Toggle checked={checked} rightAlign fullWidth>Hello</Toggle>
          <Toggle checked={checked} disabled rightAlign fullWidth>Hello</Toggle>
        </Panel>
        <Panel width={ 400 } padded>
          <RadioGroup value={ 3 }>
            <Radio fullWidth rightAlign value={ 1 } >1</Radio>
            <Radio disabled fullWidth rightAlign value={ 2 } >2</Radio>
            <Radio fullWidth rightAlign value={ 3 } >3</Radio>
            <Radio color={'#440000'} fullWidth rightAlign value={ 4 } >4</Radio>
          </RadioGroup>
        </Panel>
        <Panel padded width={400}>
          <Button fullWidth onTouchTap={ () => setLocale('sv-SE') }>{_l`Swedish`}</Button>
          <Button fullWidth onTouchTap={ () => setLocale('en-US') } primary>{_l`English`}</Button>
          <Button fullWidth href='/home' primary onTouchTap={(payload, label) => console.log(payload, label)}>{_l`Home`}</Button>
          <Button fullWidth onTouchTap={ this.addBuilding }>{_l`Add building`}</Button>
        </Panel>
        <div className='Page'>
          <Routes />
        </div>
      </div>
    );
  }
}
