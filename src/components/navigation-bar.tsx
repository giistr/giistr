import * as React from 'react';
import { Colors } from '../style';
import { Logo } from './logo';
import UserCard from './user-card';
import { clear as clearUser } from '../actions/user';
import { browserHistory } from 'react-router';
import { User } from '../reducers/user';
import { connect } from 'react-redux';

interface MainProps {
  total?: number;
  after?: number;
  clearUser: any;
  dispatch: any;
  user: User;
};

const styles = {
  container: {
    backgroundColor: 'white',
    fontSize: 13,
    padding: '0px 30px',
    borderBottom: `1px solid ${Colors.borderGrey}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    marginRight: 40
  },
  description: {
    color: Colors.lightGrey,
    display: 'flex',
    alignItems: 'center'
  },
  marked: {
    color: Colors.blue,
    margin: '0px 6px'
  },
  title: {
    padding: '0px 12px',
    lineHeight: '24px',
    borderRight: `1px solid ${Colors.borderGrey}`,
    color: Colors.grey
  },
  repoCounter: {
    paddingLeft: 12
  }
};

class NavigationBar extends React.PureComponent<MainProps, any> {

  public static defaultProps = {
    total: 0,
    after: 0
  };

  private onLogout = () => {
    const { dispatch, clearUser } = this.props;
    clearUser()(dispatch);
    browserHistory.push('/');
  };

  public render() {
    const { after, total, user } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.description}>
          <Logo style={styles.logo}/>
          <div style={styles.title}>Starred repositories</div>
          <div style={styles.repoCounter}>
            <span>Viewing about </span>
            <span style={styles.marked}>{after}</span>
            <span> of a total of </span>
            <span style={styles.marked}>{total}</span>
            <span> repositories</span>
          </div>
        </div>
        <UserCard
          onLogout={this.onLogout}
          user={user}/>
      </div>
    );
  }
}

export default
connect((state, props) => props, dispatch => ({
  dispatch,
  clearUser
}))(NavigationBar);
