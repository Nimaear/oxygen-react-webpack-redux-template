import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const css = oxygenCss({
  root: {
    position: 'relative',
    fontSize: 12,
  },
});

@connect(state => ({
  user: state.auth.user,
}))
export default class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.string,
  }

  render() {
    const { user } = this.props;
    return (
      <div className={ css.root }>
        Dashboard
      </div>
    );
  }
}
