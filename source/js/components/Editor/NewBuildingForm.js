import React from 'react';
import PropTypes from 'prop-types';
// import { Units } from 'style';
import { Segment, Header, Icon, Modal, TextArea, Form, Input, Button } from 'semantic-ui-react';
import { _l } from 'oxygen-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as buildingActions from 'dux/reducers/building';

const css = oxygenCss({
  root: {
    position: 'relative',
  },
});

addTranslations({
  'en-US': {
    'Save': 'Save',
    'Cancel': 'Cancel',
    'Building name': 'Building name',
    'Notes': 'Notes',
    'Description': 'Description',
    'Enter some notes here (optional)': 'Enter some notes here (optional)',
    'Floor name template': 'Floor name template',
    'Room name template': 'Room name template',
    'Seat name template': 'Seat name template',
    'Fill in building details': 'Fill in building details',
  },
  'sv-SE': {
    'Save': 'Save',
    'Cancel': 'Cancel',
    'Building name': 'Building name',
    'Notes': 'Notes',
    'Description': 'Description',
    'Enter some notes here (optional)': 'Enter some notes here (optional)',
    'Floor name template': 'Floor name template',
    'Room name template': 'Room name template',
    'Seat name template': 'Seat name template',
    'Fill in building details': 'Fill in building details',
  },
});


const createName = (template, object) => {
  let result = template;
  Object.keys(object).forEach(key => {
    result = result.replace(key, object[key]);
  });
  return result;
};


@connect(() => ({
}), dispatch => ({
  addBuilding: bindActionCreators(buildingActions.addBuilding, dispatch),
}))
export default class NewBuildingForm extends React.Component {
  static propTypes = {
    addBuilding: PropTypes.func,
    project: PropTypes.object,
    onRequestClose: PropTypes.func,
  };

  state = {
    name: createName(this.props.project.buildingNameTemplate, {
      '%d': this.props.project.buildingIndex,
      '%c': String.fromCharCode(96 + this.props.project.buildingIndex),
      '%C': String.fromCharCode(64 + this.props.project.buildingIndex),
    }),
    notes: '',
    description: '',
    floorNameTemplate: 'Floor %c',
    roomNameTemplate: '%fd-%d',
    seatNameTemplate: 'Seat %c',
  };

  componentWillReceiveProps(nextProps) {
    const { buildingIndex } = this.props.project;
    if (buildingIndex !== nextProps.project.buildingIndex) {
      const { buildingIndex: nextBuildingIndex } = nextProps.project;
      const name = createName(nextProps.project.buildingNameTemplate, {
        '%d': nextBuildingIndex,
        '%c': String.fromCharCode(96 + nextBuildingIndex),
        '%C': String.fromCharCode(64 + nextBuildingIndex),
      });
      this.setState({ name });
    }
  }

  addBuilding = () => {
    const { project, addBuilding, onRequestClose } = this.props;
    const {
      name,
      roomNameTemplate,
      floorNameTemplate,
      seatNameTemplate,
      description,
      notes,
    } = this.state;
    addBuilding(project.id, project.buildingIndex, name, description, notes, floorNameTemplate, roomNameTemplate, seatNameTemplate);
    if (onRequestClose) { onRequestClose(); }
  };

  render() {
    const {
      name,
      roomNameTemplate,
      floorNameTemplate,
      seatNameTemplate,
      description,
      notes,
    } = this.state;
    const { project, onRequestClose, addBuilding, ...other } = this.props;
    return (
      <Modal { ...other } size='small' closeOnDimmerClick >
        <Segment clearing>
          <Header icon='save' content={ _l`Fill in building details` } floated='left' />
        </Segment>
        <Modal.Content>
          <Form>
            <Form.Field
              control={ Input }
              value={ name }
              onChange={ (event, data) => this.setState({ name: data.value }) }
              label={ _l`Building name` }
              placeholder={ _l`Building name` }
            />
            <Form.Group widths='equal'>
              <Form.Field
                control={ Input }
                value={ floorNameTemplate }
                onChange={ (event, data) => this.setState({ floorNameTemplate: data.value }) }
                label={ _l`Floor name template` }
                placeholder={ _l`Floor name template` }
              />
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
          <Button color='green' onClick={ this.addBuilding }>
            <Icon name='checkmark' />{_l`Save`}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
