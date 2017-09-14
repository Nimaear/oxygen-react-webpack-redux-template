import React, { Component } from 'react';
import Routes from 'config/routes';
import PropTypes from 'prop-types';
import i18n, { _l } from 'oxygen-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from 'dux/reducers/app';
import * as buildingActions from 'dux/reducers/building';
import * as floorActions from 'dux/reducers/floor';
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
import { Units, fontSize, lineHeight } from 'style';

addTranslations({
  'en-US': {
    'English': 'English',
    'Swedish': 'Swedish',
    'Home': 'Home',
    '{0} floors': '{0} floors',
    'Building: {0}': 'Building: {0}',
  },
  'sv-SE': {
    'English': 'Engelsk',
    'Swedish': 'Svensk',
    'Home': 'Home',
    '{0} floors': '{0} floors',
    'Building: {0}': 'Building: {0}',
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


@connect(state => ({
  locale: state.app.locale,
  buildings: getBuildings(state),
}), dispatch => ({
  // setLocale: bindActionCreators(appActions.setLocale, dispatch),
  addBuilding: bindActionCreators(buildingActions.addBuilding, dispatch),
  addFloor: bindActionCreators(floorActions.addFloor, dispatch),
}))
export default class App extends Component {
  static propTypes = {
    locale: PropTypes.string,
    addBuilding: PropTypes.func,
    buildings: PropTypes.array,
  }


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


  addFloor = (buildingId) => {
    const { addFloor } = this.props;
    addFloor(buildingId, 'Floor', 'New floor');
  };

  render() {
    const { buildings } = this.props;
    return (
      <div className='App'>
        <Panel padded width={ 400 }>
          <Button fullWidth onTouchTap={ this.addBuilding }>{_l`Add building`}</Button>
        </Panel>
        <Panel padded>
          {buildings.map(building => {
            const floors = building.floors;
            return (
              <Panel key={ building.id }>
                <Panel padded>
                  {_l`Building: ${ building.name }`}
                  <Panel>
                    <Button onTouchTap={ () => this.addFloor(building.id) }>{_l`Add Floor`}</Button>
                  </Panel>
                </Panel>
                <Menu>
                  {floors.map(floor => {
                    return <MenuItem key={ floor.id }>{ floor.name }</MenuItem>;
                  })}
                </Menu>
              </Panel>
            );
          })}
        </Panel>
        <div className='Page'>
          <Routes />
        </div>
      </div>
    );
  }
}
