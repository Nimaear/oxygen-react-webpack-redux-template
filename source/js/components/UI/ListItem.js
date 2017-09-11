import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Units } from 'style';

const css = oxygenCss({
  root: {
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0, 0, 0, .125), inset 0 -10px 20px -10px rgba(0, 0, 0, 0.1), inset -2em 0 0 -0.3em rgba(0, 0, 0, .05)',
    display: 'block',
    borderRadius: 3,
    padding: '.75em 5em .75em 1em',
    // fontSize: `${ fontSize(0) }`,
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    borderStyle: 'none none none solid',
    borderWidth: `${ Units.base }px`,
    borderColor: 'transparent',
    backgroundColor: '#FFFFFF',
    '+root': {
      marginTop: `${ Units.base * 2 }px`,
    },
    '&disabled': {
      opacity: 0.33,
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
    ':hover': {
      boxShadow: '0 2px 4px rgba(0, 0, 0, .125), inset 0 -10px 20px -5px rgba(0, 0, 0, 0.1), inset -2em 0 0 -0.3em rgba(0, 0, 0, .10)',
      // backgroundColor: '#F7F7F7',
    },
    // lineHeight: 1.5,
  },
  item: {
    fontWeight: 'bold',
    display: 'block',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  chevron: {
    display: 'block',
    width: '1em',
    height: '1em',
    fontSize: '.75em',
    position: 'absolute',
    right: '.667em',
    top: '50%',
    marginTop: '-.6em',
  },
  right: {
    position: 'absolute',
    // fontFamily: "'Pathway Gothic One', sans-serif",
    fontSize: '2em',
    right: '1.125em',
    top: '50%',
    bottom: 0,
    marginLeft: '.25em',
    color: '#95979d',
    lineHeight: '2em',
    height: '2em',
    marginTop: '-1em',
  },
  secondary: {
    fontSize: '.8em',
    lineHeight: 1.25,
    color: '#777',
  },
});

export default class ListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    secondary: PropTypes.node,
    right: PropTypes.node,
    color: PropTypes.string,
    disabled: PropTypes.bool,
  };

  render() {
    const {
      children,
      secondary,
      disabled,
      right,
      color,
      ...other
    } = this.props;
    const cn = classNames(css.root, {
      [css.disabled]: disabled
    });
    return (
      <a className={ cn } { ...other } style={ { borderColor: color } }>
        <span className={ css.item }>{children}</span>
        <span className={ css.secondary }>{secondary}</span>
        {right && <span className={ css.right }>{right}</span>}
        <span className={ css.chevron }>
          +
        </span>
      </a>
    );
  }
}

