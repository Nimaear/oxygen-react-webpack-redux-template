import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Units } from 'style';

const css = oxygenCss({
  root: {
    position: 'relative',
    '&padded': {
      padding: `${ Units.base * 2 }px`,
    },
  },
});

export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    padded: PropTypes.bool,
  };

  render() {
    const { children, padded, ...other } = this.props;
    const cn = classNames(css.root, {
      [css.padded]: padded,
    });
    return (
      <div className={ cn } { ...other }>
        {children}
      </div>
    );
  }
}

