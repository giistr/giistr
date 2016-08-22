import * as React from 'react';
import { Colors } from '../style';
import { connect } from 'react-redux';
import { User } from '../reducers/user';

import { AboutSidebar } from '../components/about-sidebar';
import NavigationBar from '../components/navigation-bar';

interface MainProps {
  user: User;
  location: any;
};

const styles = {
  main: {
    display: 'flex',
    margin: '0px auto',
    alignItems: 'stretch',
    maxWidth: 1800
  },
  column: {
    flex: 8.5
  }
};

class About extends React.Component<MainProps, any> {
  public render() {
    const { user, location } = this.props;

    return (
      <div>
        <NavigationBar location={location} user={user}/>
        <div style={styles.main}>
          <div style={styles.column}>
            <h1><span>/</span>About</h1>
          </div>
          <AboutSidebar/>
        </div>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  user: state.get('user')
}), null)(About);
