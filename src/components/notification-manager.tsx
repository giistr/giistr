import * as React from 'react';
import { connect } from 'react-redux';
import { Colors } from '../style';

interface MainProps {
  error: any;
};

const styles = {
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    height: 50,
    backgroundColor: Colors.red,
    color: 'white',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  } as React.CSSProperties
};

class NotificationManager extends React.Component<MainProps, any> {

  public render() {
    const { error } = this.props;

    if (!error) {
      return null;
    }

    return (
      <div style={styles.container}>
        {
          error.message
        }
      </div>
    );
  }
}

export default connect((state, props) => ({
  error: state.getIn(['config', 'error'])
}), null)(NotificationManager);
