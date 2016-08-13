import * as React from 'react';

interface MainProps {
  onGetRepository: Function,
  onUserQuery: Function,
  onClear: Function
};

const styles = {
  container: {
    padding: 10,
    position: 'fixed',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    top: 0
  }
};

class Issues extends React.Component<MainProps, any> {
  public render() {
    const { onGetRepository, onUserQuery, onClear } = this.props;

    return (
      <div style={styles.container}>
        <input type="text" placeholder="Enter github user account" onChange={onUserQuery}/>
        <button onClick={onGetRepository}>Search</button>
        <button onClick={onClear}>clear</button>
      </div>
    )
  }
}

export default Issues;
