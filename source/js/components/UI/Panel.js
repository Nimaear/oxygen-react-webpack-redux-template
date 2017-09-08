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
    width: PropTypes.number,
  };

  render() {
    const { children, padded, width, ...other } = this.props;
    const cn = classNames(css.root, {
      [css.padded]: padded,
    });
    return (
      <div className={ cn } style={ { width } } { ...other }>
        {children}
      </div>
    );
  }
}

