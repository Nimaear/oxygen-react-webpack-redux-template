import React from 'react';
import PropTypes from 'prop-types';
// import { Units } from 'style';
import { Segment, Header, Icon, Modal, TextArea, Form, Input, Button } from 'semantic-ui-react';
import { _l } from 'oxygen-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as floorActions from 'dux/reducers/floor';

const css = oxygenCss({
  root: {
    position: 'relative',
  },
});

addTranslations({
  'en-US': {
    'Save': 'Save',
    'Cancel': 'Cancel',
    'Floor name': 'Floor name',
    'Notes': 'Notes',
    'Description': 'Description',
    'Enter some notes here (optional)': 'Enter some notes here (optional)',
    'Room name template': 'Room name template',
    'Seat name template': 'Seat name template',
    'Fill in floor details': 'Fill in floor details',
  },
  'sv-SE': {
    'Save': 'Save',
    'Cancel': 'Cancel',
    'Floor name': 'Floor name',
    'Notes': 'Notes',
    'Description': 'Description',
    'Enter some notes here (optional)': 'Enter some notes here (optional)',
    'Room name template': 'Room name template',
    'Seat name template': 'Seat name template',
    'Fill in floor details': 'Fill in floor details',
  },
});


const createName = (template, object) => {
  let result = template;
  // console.log(object);
  Object.keys(object).forEach(key => {
    result = result.replace(key, object[key]);
  });
  return result;
};


@connect(() => ({
}), dispatch => ({
  addFloor: bindActionCreators(floorActions.addFloor, dispatch),
}))
export default class NewFloorForm extends React.Component {
  static propTypes = {
    addFloor: PropTypes.func,
    building: PropTypes.object,
    onRequestClose: PropTypes.func,
  };

  constructor() {
    super(...arguments);
    const { building } = this.props;
    console.log(building);
    const name = createName(building.floorNameTemplate, {
      '%d': building.floorIndex,
      '%c': String.fromCharCode(96 + building.floorIndex),
      '%C': String.fromCharCode(64 + building.floorIndex),
      '%bd': building.buildingIndex,
      '%bc': String.fromCharCode(96 + building.buildingIndex),
      '%BC': String.fromCharCode(64 + building.buildingIndex),
    });
    this.state = {
      name,
      notes: '',
      description: '',
      roomNameTemplate: '%fd-%d',
      seatNameTemplate: 'Seat %c',
    }
  }

  addFloor = () => {
    const { building, addFloor, onRequestClose } = this.props;
    const {
      name,
      roomNameTemplate,
      seatNameTemplate,
      description,
      notes,
    } = this.state;
    addFloor(building.id, building.floorIndex, name, description, notes, roomNameTemplate, seatNameTemplate);
    if (onRequestClose) { onRequestClose(); }
  };

  componentWillReceiveProps(nextProps) {
    const { floorIndex } = this.props.building;
    if (floorIndex !== nextProps.building.floorIndex) {
      const { floorIndex: nextFloorIndex } = nextProps.building;
      const name = createName(this.props.building.floorNameTemplate, {
        '%d': nextFloorIndex,
        '%c': String.fromCharCode(96 + nextFloorIndex),
        '%C': String.fromCharCode(64 + nextFloorIndex),
        '%bd': this.props.building.buildingIndex,
        '%bc': String.fromCharCode(96 + this.props.building.buildingIndex),
        '%BC': String.fromCharCode(64 + this.props.building.buildingIndex),
      });
      this.setState({ name });
    }
  }

  render() {
    const {
      name,
      roomNameTemplate,
      seatNameTemplate,
      description,
      notes,
    } = this.state;
    const { building, onRequestClose, addFloor, ...other } = this.props;
    return (
      <Modal { ...other } size='small' closeOnDimmerClick >
        <Segment clearing>
          <Header icon='save' content={ _l`Fill in floor details` } floated='left' />
        </Segment>
        <Modal.Content>
          <Form>
            <Form.Field
              control={ Input }
              value={ name }
              onChange={ (event, data) => this.setState({ name: data.value }) }
              label={ _l`Floor name` }
              placeholder={ _l`Floor name` }
            />
            <Form.Group widths='equal'>
              <Form.Field
                control={ Input }
                value={ roomNameTemplate }
                onChange={ (event, data) => this.setState({ roomNameTemplate: data.value }) }
                label={ _l`Room name template` }
                placeholder={ _l`Room name template` }
              />
              <Form.Field
                control={ Input }
                value={ seatNameTemplate }
                onChange={ (event, data) => this.setState({ seatNameTemplate: data.value }) }
                label={ _l`Seat name template` }
                placeholder={ _l`Seat name template` }
              />
            </Form.Group>
            <Form.Field
              control={ Input }
              value={ description }
              onChange={ (event, data) => this.setState({ description: data.value }) }
              label={ _l`Description` }
              placeholder={ _l`Description` }
            />
            <Form.Field
              control={ TextArea }
              value={ notes }
              onChange={ (event, data) => this.setState({ notes: data.value }) }
              label={ _l`Notes` }
              placeholder={ _l`Enter some notes here (optional)` }
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={ onRequestClose }>
            <Icon name='remove' />{_l`Cancel`}
          </Button>
          <Button color='green' onClick={ this.addFloor }>
            <Icon name='checkmark' />{_l`Save`}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
