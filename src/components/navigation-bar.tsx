import * as React from 'react';

interface MainProps {};

const styles = {
  container: {
    backgroundColor: 'white',
    height: 60,
    padding: 10
  }
};

class NavigationBar extends React.Component<MainProps, any> {
  public render() {
    const {} = this.props;

    return (
      <div style={styles.container}>
      </div>
    )
  }
}

export default NavigationBar;
