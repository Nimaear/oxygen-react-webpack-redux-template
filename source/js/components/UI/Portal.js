import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import { unmountComponentAtNode, unstable_renderSubtreeIntoContainer } from 'react-dom'; // eslint-disable-line
import classNames from 'classnames';

const css = oxygenCss({
  menu: {
    position: 'relative',
    zIndex: 99,
  },
  dialog: {
    position: 'relative',
    zIndex: 100,
  },
  tooltip: {
    left: 0,
    top: 0,
    position: 'absolute',
    zIndex: 101,
  },
  positioned: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});


const isDescendant = (parent, child) => {
  let node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

export default class Portal extends Component {

  static propTypes = {
    onClickAway: PropTypes.func,
    onMount: PropTypes.func,
  };

  componentWillMount() {
    const { onMount, onClickAway } = this.props;
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
    this.renderPortal(this.props);
    if (onMount) {
      onMount(this.node);
    }
    if (onClickAway) {
      document.body.addEventListener('mousedown', this.handleClickAway);
      document.body.addEventListener('touchstart', this.handleClickAway);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.renderPortal(nextProps);
  }

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  }

  componentWillUnmount() {
    const { onClickAway } = this.props;
    this.closePortal();
    if (onClickAway) {
      document.body.removeEventListener('mousedown', this.handleClickAway);
      document.body.removeEventListener('touchstart', this.handleClickAway);
    }
  }

  node = null;

  handleClickAway = (event) => {
    const { onClickAway } = this.props;
    if (!isDescendant(this.node, event.target)) {
      onClickAway();
    }
  };

  closePortal() {
    if (this.node) {
      unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    }
    this.node = null;
  }


  renderPortal(props) {
    const { children, menu, positioned, dialog, tooltip, className, ...other } = props;
    const cn = classNames(className, css.root, {
      [css.dialog]: dialog,
      [css.positioned]: positioned,
      [css.menu]: menu,
      [css.tooltip]: tooltip,
    });

    unstable_renderSubtreeIntoContainer(this, <div className={ cn } { ...other }>{children}</div>, this.node);
  }

  render() {
    return null;
  }
}
