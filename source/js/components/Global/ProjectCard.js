import React from 'react';
import PropTypes from 'prop-types';
// import { Units } from 'style';
import { Card, Button } from 'semantic-ui-react';
import { _l } from 'oxygen-i18n';
import { Link } from 'react-router-dom';

addTranslations({
  'en-US': {
    'Go to project': 'Go to project',
  },
  'sv-SE': {
    'Go to project': 'Go to project',
  },
});

export default class ProjectCard extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    notes: PropTypes.string,
  };

  render() {
    const { id, name, description, notes } = this.props;
    return (
      <Card key={ id } >
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          {description && <Card.Description>{description}</Card.Description>}
        </Card.Content>
        {notes && <Card.Content extra>
          {notes}
        </Card.Content>}
        <Card.Content>
          <Button as={ Link } to={ `/project/${ id }` }>{_l`Go to project`}</Button>
        </Card.Content>
      </Card>
    );
  }
}
