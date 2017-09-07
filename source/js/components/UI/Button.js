import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Shadow, brighten, fontSize, lineHeight, getContrastYIQ } from 'style';

const css = oxygenCss({
  root: {
    position: 'relative',
    background: '#53c7f2',
    borderWidth: '1px 0px',
    borderTopStyle: 'solid',
    borderRightStyle: 'initial',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'initial',
    borderTopColor: '#53c7f2',
    borderRightColor: 'initial',
    borderBottomColor: '#3995b7',
    borderLeftColor: 'initial',
    borderImage: 'initial',
    borderRadius: '2px',
    boxSizing: 'border-box',
    color: `${ getContrastYIQ('#53c7f2') }`,
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: `${ fontSize(1) }`,
    lineHeight: `${ lineHeight(1) }`,
    padding: '8px 14px 6px',
    textAlign: 'center',
    textDecoration: 'none',
    verticalAlign: 'bottom',
    boxShadow: `${ Shadow[2] }`,
    transition: 'all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    ':hover': {
      boxShadow: `${ Shadow[3] }`,
      background: `${ brighten('#53c7f2', 0.1) }`,
      color: `${ getContrastYIQ('#53c7f2') }`,
      borderBottomColor: `${ brighten('#3995b7') }`,
    },
  },
});

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    const cn = classNames(css.root, {

    });
    return (
      <div className={ cn } {...this.props}>
        {children}
      </div>
    );
  }
}

