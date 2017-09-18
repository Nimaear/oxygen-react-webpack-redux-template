import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from 'dux/selectors/projects';
import ProjectCard from 'components/Global/ProjectCard';
import { Card } from 'semantic-ui-react';


@connect(state => ({
  projects: getProjects(state),
}))
export default class Dashboard extends Component {
  static propTypes= {
    projects: PropTypes.array,
  };

  render() {
    const { projects } = this.props;
    return (
      <Card.Group>
        {projects.map(project => {
          return (
            <ProjectCard key={ project.id } { ...project } />
          );
        })}
      </Card.Group>
    );
  }
}
