import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Units } from 'style';

const css = oxygenCss({
  root: {
    position: 'relative',
    padding: Units.base,
    display: 'inline-block',
    '&fullWidth': {
      display: 'block',
    },
  },
  wrapper: {
    padding: `${ Units.base }px 0`,
    borderStyle: 'none none solid none',
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  input: {
    display: 'block',
    width: '100%',
    outline: 'none',
    userSelect: ' none',
    border: 'none',
    margin: 0,
    padding: 0,
    background: 'none',
    font: 'inherit',
    fontSize: 'inherit',
  },
});

export default class TextField extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
  };

  static defaultProps = {
    type: 'text',
  };

  render() {
    const { className, fullWidth, type, ...other } = this.props;
    const cn = classNames(css.root, className, {
      [css.fullWidth]: fullWidth,
    });
    return (
      <div className={ cn }>
        <div className={ css.wrapper }>
          <input className={ css.input } type={ type } { ...other } />
        </div>
      </div>
    );
  }
}
