import * as React from 'react';
import { Colors } from '../style';
import { connect } from 'react-redux';
import { User } from '../reducers/user';
import NavigationBar from '../components/navigation-bar';
import ToolBar from '../components/toolbar';

interface MainProps {
  location?: any;
  user: User;
  filters: Map<string, any>;
};

const styles = {};

class ListView extends React.Component<MainProps, any> {

  public render() {
    const { location, user, filters } = this.props;

    return (
      <div>
        <NavigationBar
          user={user}
          location={location}/>
        <ToolBar
          filters={filters}/>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  user: state.get('user'),
  filters: state.get('filters')
}), null)(ListView);
