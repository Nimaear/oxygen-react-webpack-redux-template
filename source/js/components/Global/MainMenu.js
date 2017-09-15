import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Menu } from 'semantic-ui-react';
import { _l } from 'oxygen-i18n';
import { Link } from 'react-router-dom';

addTranslations({
  'en-US': {
    'Editor': 'Editor',
    'Buildings': 'Buildings',
    'Personel': 'Personel',
    'Home': 'Home',
  },
  'sv-SE': {
    'Editor': 'Editor',
    'Buildings': 'Buildings',
    'Personel': 'Personel',
    'Home': 'Home',
  },
});

export default class MainMenu extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className } = this.props;
    return (
      <Menu fixed='top' className={ className }>
        <Container>
          <Menu.Item as={ Link } to='/' header>
            <Image
              size='mini'
              src='https://react.semantic-ui.com/logo.png'
              style={{ marginRight: '1.5em' }}
            />
            {_l`Home`}
          </Menu.Item>
          <Menu.Item as={ Link } to='/editor'>{_l`Editor`}</Menu.Item>
          <Menu.Item as={ Link } to='/buildings'>{_l`Buildings`}</Menu.Item>
          <Menu.Item as={ Link } to='/personel'>{_l`Personel`}</Menu.Item>
        </Container>
      </Menu>
    );
  }
}

