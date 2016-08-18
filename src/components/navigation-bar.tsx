import * as React from 'react';
import { Colors } from '../style';
import { Logo } from './logo';

interface MainProps {
  total?: number;
  after?: number;
};

const styles = {
  container: {
    backgroundColor: 'white',
    margin: '10px 20px',
    padding: 10
  },
  title: {
    lineHeight: '34px',
    fontSize: 28,
    padding: '0px 2px',
    fontWeight: 100,
    color: Colors.grey,
    borderRadius: 4,
    backgroundColor: Colors.blueBackground,
    display: 'inline-block'
  },
  description: {
    marginTop: 20,
    color: Colors.lightGrey
  },
  marked: {
    color: Colors.grey
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
        <Logo/>
        <div style={styles.description}>Viewing about <span style={styles.marked}>{after}</span> of a total of <span style={styles.marked}>{total}</span> repositories</div>
      </div>
    );
  }
}

export default NavigationBar;
