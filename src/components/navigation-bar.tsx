import * as React from 'react';
import { Colors } from '../style';

interface MainProps {
  total?: number;
  after?: number;
};

const styles = {
  container: {
    backgroundColor: 'white',
    height: 60,
    padding: 10,
    borderBottom: `1px solid ${Colors.borderGrey}`
  }
};

class NavigationBar extends React.Component<MainProps, any> {

  static defaultProps = {
    total: 0,
    after: 0
  }

  public render() {
    const { after, total } = this.props;

    return (
      <div style={styles.container}>
        <h1>/Giistr</h1>
        <div>Viewing about {after} of a total of {total} repositories</div>
      </div>
    );
  }
}

export default NavigationBar;
