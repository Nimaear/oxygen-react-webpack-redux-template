import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Units, Shadow, brighten, fontSize, rgba, getContrastYIQ } from 'style';

const css = oxygenCss({
  root: {
    display: 'inline-block',
    minWidth: Units.keyline * 2,
    // margin: `${ Units.base * 4 }px ${ Units.base }px ${ Units.base * 4 }px 0`,
    '&disabled': {
      opacity: 0.33,
      cursor: 'not-allowed',
    },
    '&fullWidth': {
      display: 'block',
    },
  },
  button: {
    display: 'block',
    padding: `${ Units.base * 2.5 }px ${ Units.base * 4 }px ${ Units.base * 3 }px`,
    width: '100%',
    border: 'none',
    outline: 'none',
    font: 'inherit',
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

    '&hasIcon': {
      paddingLeft: `${ Units.base * 10 }px`,
      textAlign: 'left',
    },
    ':hover': {
      boxShadow: 'inset 0 -1px 0 1px rgba(0, 0, 0, 0.1), inset 0 -10px 20px -10px rgba(0, 0, 0, 0.1), 0 0px 2px 3px rgba(0, 0, 0, 0.05), 0 0px 2px rgba(0, 0, 0, 0.05), inset 0px 0px 200px 0px rgba(0, 0, 0, 0.1)',
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
    color: PropTypes.string,
    payload: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.array,
    ]),
    onTouchTap: PropTypes.func,
    label: PropTypes.node,
    href: PropTypes.string,
    fullWidth: PropTypes.bool,
    primary: PropTypes.bool,
  };

  static defaultProps = {
    color: '#ffffff',
  };

  handleTouchTap = (event) => {
    const { disabled, payload, label, onTouchTap, href } = this.props;
    if (!disabled && onTouchTap) {
      event.preventDefault();
      event.stopPropagation();
      if (href) {
        onTouchTap(href, label, event);
      } else {
        onTouchTap(payload, label, event);
      }
    }
  };

  render() {
    const {
      children,
      fullWidth,
      disabled,
      primary,
      color,
      onTouchTap,
      href,
      ...other
    } = this.props;
    const cn = classNames(css.root, {
      [css.disabled]: disabled,
      [css.fullWidth]: fullWidth,
    });
    const backgroundColor = primary ? '#8ce196' : color;
    const textColor = getContrastYIQ(backgroundColor);
    const textShadow = `0px 0px 1px ${ rgba(textColor, 0.5) }`;

    const props = {
      ...other,
      className: css.button,
      onClick: this.handleTouchTap,
      style: {
        color: textColor,
        textShadow,
        backgroundColor,
      },
    };

    const containerElement = React.createElement(href ? 'a' : 'button', props, children);
    return (
      <div className={ cn } >
        {containerElement}
      </div>
    );
  }
}
