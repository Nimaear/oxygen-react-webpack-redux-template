import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Units } from 'style';

const css = oxygenCss({
  root: {
    padding: Units.base,
    display: 'inline-block',
    '&fullWidth': {
      display: 'block',
    },
  },
  wrapper: {
    position: 'relative',
    padding: `${ Units.base }px 0`,
    borderStyle: 'none none solid none',
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  textarea: {
    resize: 'none',
    display: 'block',
    width: '100%',
    outline: 'none',
    userSelect: ' none',
    border: 'none',
    background: 'none',
    font: 'inherit',
    fontSize: 'inherit',
    border: 0,
    boxSizing: 'border-box',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
  },
  shared: {
    background: 'transparent',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    margin: 0,
    padding: 0,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 1.5,
  },
  limited: {
    maxHeight: 200,
  },
  pre: {
    display: 'block',
    visibility: 'hidden'
  },
});

export default class TextArea extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    limited: PropTypes.bool
  };

  componentWillUnmount() {
    this._textarea.removeEventListener('input', this.handleInput);
  }

  componentDidMount() {
    const { _textarea, _span } = this;
    if (_textarea.addEventListener) {
      _textarea.addEventListener('input', this.handleInput, false);
      _span.textContent = _textarea.value;
    }
  }

  handleInput = event => {
    const { _span } = this;
    _span.textContent = event.target.value;
  };

  focus() {
    this._textarea.focus();
  }

  select() {
    this._textarea.select();
  }

  getValue() {
    return this._textarea.value;
  }

  render() {
    const { className, limited, fullWidth, ...other } = this.props;
    const cn = classNames(css.root, className, {
      [css.fullWidth]: fullWidth,
    });
    return (
      <div className={ cn }>
        <div className={ css.wrapper }>
          <pre className={classNames(css.shared, css.pre, { [css.limited]: limited})}>
            <span ref={span => this._span = span}></span><br />
          </pre>

          <textarea
            ref={textarea => this._textarea = textarea}
            className={ classNames(css.textarea, css.shared, { [css.limited]: limited}) }
            { ...other }
          />
        </div>
      </div>
    );
  }
}
