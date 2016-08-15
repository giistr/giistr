import * as React from 'react';
import { Colors } from '../style';

interface MainProps {};

const styles = {
  container: {
    backgroundColor: 'white',
    height: 60,
    padding: 10,
    borderBottom: `1px solid ${Colors.borderGrey}`
  }
};

class NavigationBar extends React.Component<MainProps, any> {
  public render() {
    const {} = this.props;

    return (
      <div style={styles.container}>
      </div>
    );
  }
}

export default NavigationBar;
