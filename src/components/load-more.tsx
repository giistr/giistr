import * as React from 'react';
import { Colors } from '../style';
import Button from './button';

interface MainProps {
  onClickMore: Function;
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30
  },
  notice: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'white',
    boxShadow: '0 0.5px 5.5px 0 rgba(20, 22, 36, 0.06)',
    color: Colors.blue
  },
  sentence: {
    marginLeft: 20
  },
  more: {
    paddingLeft: 24,
    paddingRight: 24
  }
};

class LoadMore extends React.Component<MainProps, any> {
  public render() {
    const { onClickMore } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.notice}>
          <img src="/assets/warning.svg"/>
          <div style={styles.sentence}>Psst! you can load more repositories</div>
        </div>
        <Button
          style={styles.more}
          onClick={onClickMore}>
          See more repositories
        </Button>
      </div>
    );
  }
}

export default LoadMore;
