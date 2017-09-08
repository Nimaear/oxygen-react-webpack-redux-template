import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Units, Shadow, brighten, fontSize, rgba, getContrastYIQ } from 'style';

const css = oxygenCss({
  root: {
    border: 'none',
    outline: 'none',
    display: 'inline-block',
    minWidth: Units.keyline * 2,
    margin: `${ Units.base * 4 }px ${ Units.base }px ${ Units.base * 4 }px 0`,
    padding: `${ Units.base * 2.5 }px ${ Units.base * 4 }px ${ Units.base * 3 }px`,
    fontWeight: 700,
    fontSize: `${ fontSize(0) }`,
    borderRadius: 3,
    boxShadow: 'inset 0 -1px 0 1px rgba(0, 0, 0, 0.1), inset 0 -10px 20px -10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    color: '#777',
    transition: 'all 0.25s ease',
    textAlign: 'center',
    position: 'relative',
    textShadow: '0px 0px 2px rgba(150, 150, 150, 1)',
    ':active': {
      boxShadow: 'inset 0 -4px 0 1px rgba(0, 0, 0, 0.1), inset 0 -10px 20px -10px rgba(0, 0, 0, 0.05)',
    },
    '&disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      ':before': {
        display: 'none',
      },
    },
    '&hasIcon': {
      paddingLeft: `${ Units.base * 10 }px`,
      textAlign: 'left',
    },
    ':hover': {
      boxShadow: 'inset 0 -1px 0 1px rgba(0, 0, 0, 0.1), inset 0 -10px 20px -10px rgba(0, 0, 0, 0.1), 0 0px 2px 3px rgba(0, 0, 0, 0.05), inset 0 0 10px 20px rgba(0, 0, 0, 0.05)',
    },
  },
  // highlight: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   transition: 'background 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  // },

});

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
    onClick: PropTypes.func,
    color: PropTypes.string,
  };

  static defaultProps = {
    color: '#ffffff'
  };

  handleTouchTap = event => {
    const {
      disabled,
      onClick,
    } = this.props;
    if (!disabled && onClick) {
      onClick(event);
    }
  }

  render() {
    const {
      children,
      primary,
      disabled,
      color,
      ...other
    } = this.props;
    const cn = classNames(css.root, {
      [css.primary]: primary,
      [css.disabled]: disabled,
    });
    const backgroundColor = primary ? '#8ce196' : color;
    const textColor = getContrastYIQ(backgroundColor);
    const textShadow = `0px 0px 1px ${ rgba(textColor, 0.5) }`;
    return (
      <button { ...other } className={ cn } onClick={ this.handleTouchTap } style={ { color: textColor, textShadow, backgroundColor } }>
        {children}
      </button>
    );
  }
}

