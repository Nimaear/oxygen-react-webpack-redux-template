import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'components/UI/Button';

import { Units } from 'style';

const css = oxygenCss({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: Units.keyline,
  },
});

export default class MainMenu extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...other } = this.props;
    const cn = classNames(css.root, className, {

    });
    return (
      <div className={ cn } { ...other }>
        {children}
      </div>
    );
  }
}

