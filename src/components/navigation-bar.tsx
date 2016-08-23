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
  location: any;
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
    marginLeft: 30,
    marginRight: 20
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

  private renderCounter = (after: number, total: number) => {
    return (
      <div style={styles.repoCounter}>
        <span>Viewing about </span>
        <span style={styles.marked}>{after}</span>
        <span> of a total of </span>
        <span style={styles.marked}>{total}</span>
        <span> repositories</span>
      </div>
    );
  };

  private renderInfo() {
    return (
      <div>
        Let's contribute to the open source world
      </div>
    );
  }

  public render() {
    const { after, total, user, location } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.description}>
          <a href="/">
            <Logo style={styles.logo}/>
          </a>
          {
            total && after ? this.renderCounter(after, total) : this.renderInfo()
          }
        </div>
        {
          user.size > 0 && (
            <UserCard
              location={location}
              onLogout={this.onLogout}
              user={user}/>
          )
        }
        {
          !user && (
            <div>
              <div>
                Signup with github
              </div>
              <span>
                or
              </span>
              <div>
                Get unlimited access with token
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default
connect((state, props) => props, dispatch => ({
  dispatch,
  clearUser
}))(NavigationBar);
