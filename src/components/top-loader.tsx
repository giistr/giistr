import * as React from 'react';

const styles = {
  container: {
    transform: 'translateX(100%)',
    background: '#48e79a',
    position: 'fixed',
    display: 'none',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    zIndex: 800
  },
  loading: {
    display: 'block',
    animation: 'shift-rightwards 1s ease-in-out infinite',
    animationDelay: 0.8
  }
};

export default class TopLoader extends React.PureComponent<{ loading: boolean; }, any> {

  public render() {
    let style = styles.container;

    if (this.props.loading) {
      style = Object.assign({}, style, styles.loading);
    }

    return (
      <div style={style}>
      </div>
    );
  }
}
