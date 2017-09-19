import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBuildings } from 'dux/selectors/building';
import * as buildingActions from 'dux/reducers/building';
import { withRouter } from 'react-router';
import { Header, List, Segment, Button, Confirm } from 'semantic-ui-react';
import NewBuildingForm from 'components/Editor/NewBuildingForm';
import NewFloorForm from 'components/Editor/NewFloorForm';
import { _l } from 'oxygen-i18n';

addTranslations({
  'en-US': {
    'New building': 'New building',
    'Are you sure?': 'Are you sure?',
    'No': 'No',
    'Remove': 'Remove',
    'Do you really want to remove this building from the list?': 'Do you really want to remove this building from the list?',
  },
  'sv-SE': {
    'New building': 'New building',
    'Are you sure?': 'Are you sure?',
    'No': 'No',
    'Remove': 'Remove',
    'Do you really want to remove this building from the list?': 'Do you really want to remove this building from the list?',
  },
});

@withRouter
@connect((state, props) => {
  const { match } = props;
  const { projectId } = match.params;
  return {
    project: state.entities.project[projectId],
    buildings: getBuildings(state, projectId),
  };
}, dispatch => ({
  deleteBuilding: bindActionCreators(buildingActions.deleteBuilding, dispatch),
}))
export default class Project extends Component {
  static propTypes = {
    project: PropTypes.object,
    buildings: PropTypes.array,
    deleteBuilding: PropTypes.func,
  };

  state = {
    newBuildingForProject: null,
    buildingToDelete: null,
    newFloorForBuilding: null,
  };

  deleteBuilding = () => {
    const { buildingToDelete } = this.state;
    const { project, deleteBuilding } = this.props;
    deleteBuilding(project.id, buildingToDelete.id);
    this.setState({ buildingToDelete: null });
  }

  render() {
    const { project, buildings } = this.props;
    const {
      buildingToDelete,
      newBuildingForProject,
      newFloorForBuilding,
    } = this.state;
    return (
      <div>
        <Segment clearing>
          <Header floated='left'>
            <Header.Content>{project.name}</Header.Content>
            <Header.Subheader>{project.description}</Header.Subheader>
          </Header>
          <Header floated='right'>
            <Button primary onClick={ () => this.setState({ newBuildingForProject: project }) }>
              {_l`New building`}
            </Button>
          </Header>
        </Segment>
        {buildings.map(building => {
          return (
            <Segment.Group key={ building.id }>
            <Segment  inverted>
              <List divided inverted relaxed>
                <List.Item>
                  <List.Content floated='right'>
                    <Button icon='comment' onClick={ () => this.setState({ buildingToDelete: building.id }) } />
                    <Button color='green' icon='plus' onClick={ () => this.setState({ newFloorForBuilding: building }) } />
                    <Button color='red' icon='trash' onClick={ () => this.setState({ buildingToDelete: building }) } />
                  </List.Content>
                  <List.Content verticalAlign='middle'>
                    <List.Header>{building.name}</List.Header>
                    {building.description}
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
            <Segment>
              <List divided>
                {building.floors.map(floor => {
                  return (
                    <List.Item key={ floor.id }>
                      <List.Content floated='right'>
                        <Button icon='comment' onClick={ () => this.setState({ buildingToDelete: building.id }) } />
                        <Button color='green' icon='plus' onClick={ () => this.setState({ newFloorForBuilding: building }) } />
                        <Button color='red' icon='trash' onClick={ () => this.setState({ buildingToDelete: building }) } />
                      </List.Content>
                      <List.Content>{floor.name}</List.Content>
                    </List.Item>
                  )
                })}
              </List>
            </Segment>
            </Segment.Group>
          );
        })}
        <Confirm
          header={ _l`Are you sure?` }
          open={ buildingToDelete !== null }
          cancelButton={ _l`No` }
          confirmButton={ _l`Remove` }
          content={ _l`Do you really want to remove this building from the list?` }
          onCancel={ () => this.setState({ buildingToDelete: null }) }
          onConfirm={ this.deleteBuilding }
        />
        {newBuildingForProject && <NewBuildingForm
          project={ newBuildingForProject }
          open={ true }
          onRequestClose={ () => this.setState({ newBuildingForProject: null }) }
          onClose={ () => this.setState({ newBuildingForProject: null }) }
        />}
        {newFloorForBuilding && <NewFloorForm
          building={ newFloorForBuilding }
          open={ true }
          onRequestClose={ () => this.setState({ newFloorForBuilding: null }) }
          onClose={ () => this.setState({ newFloorForBuilding: null }) }
        />}
      </div>
    );
  }
}
