import * as React from 'react';
import { Colors } from '../style';
import { connect } from 'react-redux';
import { User } from '../reducers/user';

import NavigationBar from '../components/navigation-bar';

interface MainProps {
  user: User;
};

const styles = {};

class About extends React.Component<MainProps, any> {
  public render() {
    const { user } = this.props;

    return (
      <div>
        <NavigationBar user={user}/>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  user: state.get('user')
}), null)(About);
