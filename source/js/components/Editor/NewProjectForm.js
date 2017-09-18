import React from 'react';
import PropTypes from 'prop-types';
// import { Units } from 'style';
import { Segment, Header, Icon, Modal, TextArea, Form, Input, Button } from 'semantic-ui-react';
import { _l } from 'oxygen-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from 'dux/reducers/project';

const css = oxygenCss({
  root: {
    position: 'relative',
  },
});

addTranslations({
  'en-US': {
    'Save': 'Save',
    'Cancel': 'Cancel',
    'Project name': 'Project name',
    'Notes': 'Notes',
    'Description': 'Description',
    'Enter some notes here (optional)': 'Enter some notes here (optional)',
    'Building %c': 'Building %c',
    'Building name template': 'Building name template',
    'New project': 'New project',
    'Fill in project details': 'Fill in project details',
  },
  'sv-SE': {
    'Save': 'Save',
    'Cancel': 'Cancel',
    'Project name': 'Project name',
    'Notes': 'Notes',
    'Description': 'Description',
    'Enter some notes here (optional)': 'Enter some notes here (optional)',
    'Building %c': 'Building %c',
    'Building name template': 'Building name template',
    'New project': 'New project',
    'Fill in project details': 'Fill in project details',
  },
});


@connect(state => ({
}), dispatch => ({
  addProject: bindActionCreators(projectActions.addProject, dispatch),
}))
export default class NewProjectForm extends React.Component {
  static propTypes = {
    addProject: PropTypes.func,
    onRequestClose: PropTypes.func,
  };

  state = {
    name: _l`New project`,
    notes: '',
    description: '',
    buildingNameTemplate: _l`Building %c`,
  };

  addProject = () => {
    const { addProject, onRequestClose } = this.props;
    const { name, buildingNameTemplate, notes, description } = this.state;
    addProject(name, description, notes, buildingNameTemplate);
    if (onRequestClose) { onRequestClose(); }
  };

  render() {
    const { name, buildingNameTemplate, description, notes } = this.state;
    const { onRequestClose, addProject, ...other } = this.props;
    return (
      <Modal { ...other } size='small' closeOnDimmerClick >
        <Segment clearing>
          <Header icon='save' content={ _l`Fill in project details` } floated='left' />
        </Segment>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field
                control={ Input }
                value={ name }
                onChange={ (event, data) => this.setState({ name: data.value }) }
                label={ _l`Project name` }
                placeholder={ _l`Project name` }
              />
              <Form.Field
                control={ Input }
                value={ buildingNameTemplate }
                onChange={ (event, data) => this.setState({ buildingNameTemplate: data.value }) }
                label={ _l`Building name template` }
                placeholder={ _l`Building name template` }
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
          <Button color='green' onClick={ this.addProject }>
            <Icon name='checkmark' />{_l`Save`}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
