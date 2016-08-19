import * as React from 'react';
import { User } from '../reducers/user';
import { Colors } from '../style';

const styles = {
  container: {
    margin: 20
  },
  first: {
    display: 'flex',
    alignItems: 'center',
    margin: '12px 0px',
    color: Colors.grey,
    fontSize: 14
  },
  company: {
    marginLeft: 20
  },
  location: {
    marginLeft: 20
  },
  login: {
    marginLeft: 10,
    cursor: 'pointer'
  },
  avatar: {
    borderRadius: '50%',
    border: `1px solid ${Colors.borderGrey}`
  },
  bio: {
    color: Colors.lightGrey,
    fontSize: 13,
    lineHeight: '22px'
  },
  logout: {
    fontSize: 12,
    lineHeight: '18px',
    color: Colors.blue,
    textDecoration: 'underline',
    cursor: 'pointer'
  }
};

class UserCard extends React.PureComponent<{ user: User; onLogout: Function; }, any> {

  public shouldComponentUpdate(nextProps) {
    return !nextProps.user.equals(this.props.user);
  }

  public render() {
    const { user, onLogout } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.first}>
          <div style={styles.avatar}>
            <img width={60} src={user.get('avatar_url')}/>
          </div>
          <div style={styles.login}>
            <a href={user.get('html_url')} target="_blank">{ user.get('login') }</a>
          </div>
          <div style={styles.company}>{ user.get('company') }</div>
          <div style={styles.location}>{ user.get('location') }</div>
        </div>
        <div style={styles.bio}>
          { user.get('bio') }
        </div>
        <div>
          <div style={styles.logout} onClick={onLogout}>Logout</div>
        </div>
      </div>
    );
  }
}

export default UserCard;
