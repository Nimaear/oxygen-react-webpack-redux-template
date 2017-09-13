import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';

export default WrappedComponent => {
  const componentName = WrappedComponent.displayName || WrappedComponent.name;

  class EnhancedComponent extends React.Component {
    static displayName = `Wrapped${ componentName }`;

    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside, true);
      document.addEventListener('touchstart', this.handleTouchStart, true);
      document.addEventListener('touchend', this.handleTouchEnd, true);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside, true);
      document.removeEventListener('touchstart', this.handleTouchStart, true);
      document.removeEventListener('touchend', this.handleTouchEnd, true);
    }

    handleClickOutside = (event) => {
      const { domNode, wrappedComponent } = this;
      if ((!domNode || !domNode.contains(event.target)) &&
        typeof wrappedComponent.handleClickOutside === 'function') {
        wrappedComponent.handleClickOutside(event);
      }
    };

    handleTouchStart = (event) => {
      const touchObj = event.changedTouches[0];
      this.pageX = touchObj.pageX;
    };

    handleTouchEnd = (event) => {
      const touchObj = event.changedTouches[0];
      if (this.pageX === touchObj.pageX) {
        this.handleClickOutside(event);
      }
    };

    render() {
      return (
        <div ref={ node => this.domNode = node }>
          <WrappedComponent
            { ...this.props }
            ref={ wrappedComponent => this.wrappedComponent = wrappedComponent }
          />
        </div>
      );
    }
  }

  return hoistNonReactStatic(EnhancedComponent, WrappedComponent);
};
