import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Menu, Modal, Dropdown, Button } from 'semantic-ui-react';
import { _l } from 'oxygen-i18n';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from 'dux/reducers/app';
import NewProjectForm from 'components/Editor/NewProjectForm';

addTranslations({
  'en-US': {
    'Editor': 'Editor',
    'Projects': 'Projects',
    'Home': 'Home',
    'Language': 'Language',
    'English': 'English',
    'Swedish': 'Swedish',
    'New project': 'New project',
    'Sign in': 'Sign in',
    'Save': 'Save',
  },
  'sv-SE': {
    'Editor': 'Editor',
    'Projects': 'Projects',
    'Home': 'Home',
    'Language': 'Language',
    'English': 'Engelsk',
    'Swedish': 'Svensk',
    'New project': 'New project',
    'Sign in': 'Sign in',
    'Save': 'Save',
  },
});


@connect(state => ({
  locale: state.app.locale,
  entities: state.entities,
}), dispatch => ({
  setLocale: bindActionCreators(appActions.setLocale, dispatch),
  save: bindActionCreators(appActions.save, dispatch),
}))
export default class MainMenu extends Component {
  static propTypes = {
    className: PropTypes.string,
    locale: PropTypes.string,
    setLocale: PropTypes.func,
    save: PropTypes.func,
  };

  state = {
    newProjectForm: false,
  };

  save = () => {
    const { save } = this.props;
    save();
  };

  render() {
    const { locale, setLocale, save } = this.props;
    const { newProjectForm } = this.state;
    return (
      <Menu fixed='top'>
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
        </Container>
        <Menu.Menu position='right'>
          <Dropdown item placeholder={ _l`Language` }>
            <Dropdown.Menu onChange={ this.changeLocale }>
              <Dropdown.Item
                selected={ locale === 'en-US'}
                onClick={ () => setLocale('en-US') }
              >
                { _l`English` }
              </Dropdown.Item>
              <Dropdown.Item
                selected={ locale === 'sv-SE'}
                onClick={ () => setLocale('sv-SE') }
              >
                { _l`Swedish` }
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown.Item>
            <Button onClick={ () => this.setState({ newProjectForm: true }) }>{_l`New project`}</Button>
          </Dropdown.Item>
          <Menu.Item>
            <Button onClick={ save } primary>{_l`Save`}</Button>
          </Menu.Item>
          <Menu.Item>
            <Button primary>{_l`Sign in`}</Button>
          </Menu.Item>
        </Menu.Menu>
        <NewProjectForm
          open={ newProjectForm }
          onRequestClose={ () => this.setState({ newProjectForm: false }) }
          onClose={ () => this.setState({ newProjectForm: false }) }
        />
      </Menu>
    );
  }
}

