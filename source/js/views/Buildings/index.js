import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import * as buildingActions from 'dux/reducers/building';
import * as floorActions from 'dux/reducers/floor';
import { connect } from 'react-redux';
import { getBuildings } from 'dux/selectors/building';

import Button from 'components/UI/Button';
import Panel from 'components/UI/Panel';
import Menu from 'components/UI/Menu';
import MenuItem from 'components/UI/MenuItem';

const css = oxygenCss({
  root: {
    position: 'relative',
  },
});

@connect(state => ({
  buildings: getBuildings(state),
}), dispatch => ({
  addBuilding: bindActionCreators(buildingActions.addBuilding, dispatch),
  addFloor: bindActionCreators(floorActions.addFloor, dispatch),
}))
export default class Building extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    addFloor: PropTypes.func,
    addBuilding: PropTypes.func,
    buildings: PropTypes.array,
  };

  addBuilding = () => {
    const { addBuilding } = this.props;
    addBuilding('Oz', 'Building of Öz');
  };


  addFloor = (buildingId) => {
    const { addFloor } = this.props;
    addFloor(buildingId, 'Floor', 'New floor');
  };


  render() {
    const { children, buildings, className, ...other } = this.props;
    const cn = classNames(css.root, className, {

    });
    return <div>Buildings</div>;
    // return (
    //   <div className={ cn } { ...other }>
    //     <Panel padded width={ 400 }>
    //       <Button fullWidth onTouchTap={ this.addBuilding }>{_l`Add building`}</Button>
    //     </Panel>
    //     <Panel padded>
    //       {buildings.map(building => {
    //         const floors = building.floors;
    //         return (
    //           <Panel key={ building.id }>
    //             <Panel padded>
    //               {_l`Building: ${ building.name }`}
    //               <Panel>
    //                 <Button onTouchTap={ () => this.addFloor(building.id) }>{_l`Add Floor`}</Button>
    //               </Panel>
    //             </Panel>
    //             <Menu>
    //               {floors.map(floor => {
    //                 return <MenuItem key={ floor.id }>{ floor.name }</MenuItem>;
    //               })}
    //             </Menu>
    //           </Panel>
    //         );
    //       })}
    //     </Panel>
    //   </div>
    // );
  }
}


