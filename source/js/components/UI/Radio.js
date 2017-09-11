import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Units } from 'style';

const css = oxygenCss({
  root: {
    display: 'inline-block',
    position: 'relative',
    padding: `${ Units.base }px ${ Units.base }px ${ Units.base }px ${ (Units.keyline / 2) + (Units.base * 2) }px`,
    height: `${ (Units.keyline / 2) + (Units.base * 2) }px`,
    lineHeight: `${ (Units.keyline / 2) }px`,
    '&rightAlign': {
      padding: `${ Units.base }px ${ (Units.keyline / 2) + (Units.base * 2) }px ${ Units.base }px ${ Units.base }px`,
      button: {
        left: 'auto',
        right: Units.base,
      },
    },
    '&fullWidth': {
      display: 'block',
    },
    '&disabled': {
      opacity: 0.33,
      ' label': {
        cursor: 'not-allowed',
      },
    },
  },
  button: {
    position: 'absolute',
    verticalAlign: 'middle',
    display: 'inline-block',
    left: Units.base,
    top: Units.base,
  },
  input: {
    position: 'absolute',
    visibility: 'hidden',
  },
  label: {
    display: 'block',
    position: 'relative',
    cursor: 'pointer',
    outline: 'none',
    userSelect: 'none',
    padding: `${ Units.base / 2 }px`,
    width: `${ Units.keyline / 2 }px`,
    height: `${ Units.keyline / 2 }px`,
    borderRadius: `${ Units.keyline / 2 }px`,
    transition: 'background 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    backgroundColor: '#FFFFFF',
  },
  background: {
    display: 'block',
    position: 'absolute',
    top: 2,
    left: 2,
    bottom: 2,
    right: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: `${ Units.keyline / 2 }px`,
    transition: 'background 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  knob: {
    display: 'block',
    position: 'absolute',
    top: 2,
    left: 2,
    bottom: 2,
    right: 2,
    backgroundColor: '#DDDDDD',
    width: `${ (Units.keyline / 2) - 8 }px`,
    borderRadius: `${ (Units.keyline / 2) - 8 }px`,
    boxShadow: 'inset 0 -1px 0 1px rgba(0, 0, 0, 0.1), inset 0 -10px 20px -10px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
});

let id = 0;

export default class Radio extends Component {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    checked: PropTypes.bool,
    fullWidth: PropTypes.bool,
    rightAlign: PropTypes.bool,
    onChange: PropTypes.func,
    color: PropTypes.string,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    color: '#8ce196',
  };

  static isRadio = true;

  constructor() {
    super();
    this.id = `radio-${ ++id }`;
  }

  handleChange = (event) => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange(value, event.target.checked);
    }
  };

  render() {
    const { children, disabled, rightAlign, color, fullWidth, onChange, value, name, checked, ...other } = this.props;
    const cn = classNames(css.root, {
      [css.fullWidth]: fullWidth,
      [css.rightAlign]: rightAlign,
      [css.disabled]: disabled
    });
    const backgroundColor = checked ? color : null;
    return (
      <div className={ cn } >
        <div className={ css.button } { ...other }>
          <input
            id={ this.id }
            className={ css.input }
            type='radio'
            value={ value }
            disabled = { disabled }
            checked={ checked }
            name={ name }
            onChange={ this.handleChange }
          />
          <label htmlFor={ this.id } className={ css.label } style={ { backgroundColor } } >
            <div className={ css.background }>
              <div className={ css.knob } style={ { backgroundColor } } />
            </div>
          </label>
        </div>
        {children}
      </div>
    );
  }
}

