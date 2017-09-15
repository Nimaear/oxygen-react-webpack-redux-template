import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Units } from 'style';

const css = oxygenCss({
  root: {
    position: 'relative',
    paddingTop: Units.keyline,
  },
});

export default class Page extends Component {
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

