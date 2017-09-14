import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Units } from 'style';

const css = oxygenCss({
  root: {
    display: 'block',
    position: 'relative',
    padding: `${ Units.base * 2 }px ${ Units.base }px`,
    cursor: 'pointer',
    '&selected': {
      boxShadow: 'inset 0px 0px 200px 0px rgba(0, 255, 255, 0.1)',
      fontWeight: 700,
    },
    '&disabled': {
      opacity: 0.33,
      cursor: 'not-allowed',
      ':hover': {
        boxShadow: 'none',
      },
    },
    ':hover': {
      boxShadow: 'inset 0px 0px 200px 0px rgba(0, 0, 0, 0.1)',
    },
    '+root': {
      borderStyle: 'solid none none none',
      borderWidth: 1,
      borderColor: '#DDD',
    },
  },
});

export default class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
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
    const { children, selected, disabled, label, className, ...other } = this.props;
    const cn = classNames(css.root, className, {
      [css.disabled]: disabled,
      [css.selected]: selected,
    });
    return (
      <a role={ 'button' } tabIndex={ 0 } className={ cn } { ...other } onClick={ this.handleTouchTap }>
        {label}{children}
      </a>
    );
  }
}

