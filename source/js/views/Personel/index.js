import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const css = oxygenCss({
  root: {
    position: 'relative',
  },
});

export default class Personel extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...other } = this.props;
    const cn = classNames(css.root, className, {

    });
    return (
      <div className={ cn }>
        Personel
      </div>
    );
  }
}
