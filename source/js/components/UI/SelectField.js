import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button';
import Menu from './Menu';
import MenuItem from './MenuItem';
import Portal from './Portal';
import { Motion, spring } from 'react-motion';
import { Units } from 'style';

const css = oxygenCss({
  root: {
    boxSizing: 'border-box',
    display: 'inline-block',
    minWidth: Units.keyline * 2,
    margin: `${ Units.base * 4 }px ${ Units.base }px ${ Units.base * 4 }px 0`,
    '&disabled': {
      opacity: 0.33,
      cursor: 'not-allowed',
    },
    '&fullWidth': {
      display: 'block',
    },
  },
});

export default class SelectField extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    items: PropTypes.array,
    defaultValue: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.array,
    ]),
  };

  static defaultProps = {
    ítems: [],
  };

  state = {
    menu: false,
    label: null,
    value: null,
  };

  constructor() {
    super(...arguments);
    const { defaultValue, items } = this.props;
    let value;
    let label;
    let readable;
    if (items.length) {
      items.some(item => {
        const [itemValue, itemLabel] = item;
        if (itemValue === defaultValue) {
          label = itemLabel;
          value = itemValue;
          return true;
        }
      });
      if (!label) {
        const [itemValue, itemLabel] = items[0];
        label = itemLabel;
        value = itemValue;
      }
    }
    this.state = {
      value,
      label,
      hover: false,
      active: false,
      menu: false,
    };
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleMenuClose);
  }

  handleMenuClose = () => {
    this.setState({ menu: false });
  };

  handleTouchTap = (event) => {
    const boundingRect = this.node.getBoundingClientRect();
    const { width, left, top } = boundingRect;
    // let width;

    // if (getComputedStyle) {
    //   const cs = getComputedStyle(this.node);

    //   const marginX = parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
    //   // const paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingButtom);

    //   // const borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    //   // const borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

    //   // Element width and height minus padding and border
    //   width = boundingRect.width - marginX;
    //   // elementHeight = element.offsetHeight - paddingY - borderY;
    //   // width = elementWidth
    // } else {
    //   width = boundingRect.width;
    // }
    window.addEventListener('scroll', this.handleMenuClose);

    const doc = document.documentElement;

    this.setState({
      menu: true,
      left: left + ((window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)),
      top: top + ((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)),
      width: width - (Units.base * 2),
    });
  };

  select = (payload, label) => {
    if (this.state.payload !== payload) {
      const { onChange } = this.props;
      this.setState({ label, value: payload, menu: false });
      if (onChange) {
        onChange(payload);
      }
    }
  };

  renderMenu(progress) {
    const { value, width } = this.state;
    const { items } = this.props;
    return (
      <Menu
        disabled={ progress < 1 }
        onRequestClose={ this.handleMenuClose }
        style={ {
          position: 'relative',
          width,
          top: 60 - (progress * 60),
          opacity: progress,
        } }
      >
        {items.map(item => {
          const [payload, label] = item;
          return (
            <MenuItem
              key={ payload }
              selected={ value === payload }
              onTouchTap={ this.select }
              payload={ payload }
              label={ label }
            />
          );
        })}
      </Menu>
    );
  }

  render() {
    const {
      children,
      className,
      disabled,
      fullWidth,
      ...other
    } = this.props;
    const cn = classNames(css.root, className, {
      [css.disabled]: disabled,
      [css.fullWidth]: fullWidth,
    });
    const { left, top, menu, label } = this.state;
    return (
      <div className={ cn } { ...other } ref={ node => this.node = node }>
        <Button fullWidth onTouchTap={this.handleTouchTap}>
          {label}
        </Button>
        <Motion style={ { progress: spring(menu ? 1 : 0) } }>
          {interpolated => {
            const { progress } = interpolated;
            if (progress > 0) {
              return (
                <Portal
                  positioned
                  menu
                  style={ {
                    transform: `translate3d(${ left + Units.base }px, ${ top + Units.base }px, 0)`,
                  } }
                >
                  {this.renderMenu(progress)}
                </Portal>
              );
            }
            return null;
          }}
        </Motion>
      </div>
    );
  }
}

