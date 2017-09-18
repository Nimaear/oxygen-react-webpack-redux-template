import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as buildingActions from 'dux/reducers/building';
import * as floorActions from 'dux/reducers/floor';
import { getBuildings } from 'dux/selectors/building';
import { Header, Segment, Button, Menu, Icon, List } from 'semantic-ui-react';
import NewProjectForm from 'components/Editor/NewProjectForm';
import { _l } from 'oxygen-i18n';
import { Units } from 'style';

const css = oxygenCss({
  root: {
    position: 'relative',
    marginBottom: Units.base * 2,
  },
});

addTranslations({
  'en-US': {
    'Add building': 'Add building',
    'Add floor': 'Add floor',
    '{0} floors': '{0} floors',
  },
  'sv-SE': {
    'Add building': 'Lägg till byggnad',
    'Add floor': 'Lägg till golv',
    '{0} floors': '{0} floors',
  },
});


let buildingNumber = 1;
let floorNumber = 1;

@connect(state => ({
}), dispatch => ({
}))
export default class Person extends Component {
  static propTypes = {
    className: PropTypes.string,
    buildings: PropTypes.array,
  };

  // addBuilding = () => {
  //   const { addBuilding } = this.props;
  //   addBuilding(`Building ${ buildingNumber }`, `This is the building with number ${ buildingNumber }`);
  //   buildingNumber++;
  // };

  // addFloor = (buildingId) => {
  //   const { addFloor } = this.props;
  //   addFloor(buildingId, `Floor ${ floorNumber }`, `This is the floor with number ${ floorNumber }`);
  //   floorNumber++;
  // };

  render() {
    const { className } = this.props;
    const cn = classNames(css.root, className, {

    });
    return (
      <div className={ cn }>
        <NewProjectForm />
      </div>
    );
  }
}

