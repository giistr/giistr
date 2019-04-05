import * as React from 'react';
import { Colors } from '../style';
import { Logo } from './logo';
import UserCard from './user-card';
import { clear as clearUser } from '../actions/user';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import { User } from '../reducers/user';
import { connect } from 'react-redux';
import { RawButton } from '../components/raw-button';

interface MainProps {
  total?: number;
  after?: number;
  clearUser: any;
  user: User;
  location: any;
  push: typeof push;
}

const styles = {
  container: {
    backgroundColor: 'white',
    fontSize: 13,
    borderBottom: `1px solid ${Colors.borderGrey}`
  },
  wrapper: {
    maxWidth: 1800,
    minHeight: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0px auto'
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
    margin: '0px 2px'
  },
  repoCounter: {
    paddingLeft: 12,
    marginTop: 6
  },
  landingLinks: {
    display: 'flex',
    marginRight: 30
  },
  or: {
    padding: '0px 10px',
    lineHeight: '14px',
    color: Colors.lightGrey
  }
};

class NavigationBar extends React.PureComponent<MainProps, any> {
  public static defaultProps = {
    total: 0,
    after: 0
  };

  private onLogout = () => {
    const { clearUser, push } = this.props;
    clearUser();
    push('/');
  };

  private renderCounter = (after: number, total: number) => {
    return (
      <div style={styles.repoCounter}>
        <span>Viewing </span>
        <span style={styles.marked}>{after}</span>
        <span> on </span>
        <span style={styles.marked}>{total}</span>
        <span> starred repositories of a total of </span>
        <span style={styles.marked}>{this.props.user.get('starred')}</span>
      </div>
    );
  };

  private renderInfo() {
    return (
      <div style={styles.repoCounter}>
        Let's contribute to the open source world
      </div>
    );
  }

  private onClickLanding() {
    this.props.push('/');
  }

  public render() {
    const { after, total, user, location } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.description}>
            <a href="/">
              <Logo style={styles.logo} width={60} />
            </a>
            {total && after
              ? this.renderCounter(after, total)
              : this.renderInfo()}
          </div>
          {user.size > 0 && (
            <UserCard
              location={location}
              onLogout={this.onLogout}
              user={user}
            />
          )}
          {!user.size && (
            <div style={styles.landingLinks}>
              <RawButton onClick={this.onClickLanding}>
                Signup with github
              </RawButton>
              <div style={styles.or}>or</div>
              <RawButton onClick={this.onClickLanding}>
                Get unlimited access with token
              </RawButton>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (_, props) => props,
  dispatch => ({
    clearUser: bindActionCreators(clearUser, dispatch),
    push: bindActionCreators(push, dispatch)
  })
)(NavigationBar);
