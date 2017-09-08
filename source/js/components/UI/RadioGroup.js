import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Radio from './Radio';

const css = oxygenCss({
  root: {
    position: 'relative',
  },
});

export default class RadioGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  state = {
    value: this.props.value,
  };

  render() {
    const { children, onChange, ...other } = this.props;
    const cn = classNames(css.root, {

    });
    return (
      <div className={ cn } { ...other }>
        {React.Children.map(children, child => {
          if (child.type.isRadio) {
            return React.cloneElement(child, {
              checked: this.state.value === child.props.value,
              onChange: value => {
                if (this.state.value !== value) {
                  this.setState({ value });
                  if (onChange) {
                    onChange(value);
                  }
                }
              },
            });
          }
          return child;
        })}
      </div>
    );
  }
}

