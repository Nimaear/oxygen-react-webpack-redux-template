import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import enhanceWithClickOutside from 'lib/enhanceWithClickOutside';

const css = oxygenCss({
  root: {
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0, 0, 0, .125), inset 0 -10px 20px -10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});

const ESC = 27;

@enhanceWithClickOutside
export default class Menu extends Component {
  static propTypes = {
    children: PropTypes.node,
    onRequestClose: PropTypes.func,
    closeOnEsc: PropTypes.bool,
  };

  static defaultProps = {
    closeOnEsc: true,
  };

  componentDidMount() {
    const { closeOnEsc, onRequestClose } = this.props;
    if (onRequestClose) {
      document.body.addEventListener('touchstart', this.onBodyTouchStart);
      document.body.addEventListener('mousedown', this.onBodyTouchStart);
    }
    if (closeOnEsc) {
      document.addEventListener('keyup', this.handleKey);
    }
  }

  handleClickOutside = () => {
    const { onRequestClose } = this.props;
    if (onRequestClose) {
      onRequestClose();
    }
  };

  handleKey = (event) => {
    const { keyCode } = event;
    const { onRequestClose } = this.props;
    if (onRequestClose && keyCode === ESC) {
      onRequestClose();
    }
  };


  render() {
    const { children, closeOnEsc, onRequestClose, ...other } = this.props;
    const cn = classNames(css.root, {

    });
    return (
      <div className={ cn } { ...other }>
        {children}
      </div>
    );
  }
}

