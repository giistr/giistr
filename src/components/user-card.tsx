import * as React from 'react';
import { User } from '../reducers/user';
import { Colors } from '../style';

interface MainProps {
  user: User;
};

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
    marginLeft: 10
  },
  avatar: {
    borderRadius: '50%',
    border: `1px solid ${Colors.borderGrey}`
  },
  bio: {
    color: Colors.lightGrey,
    fontSize: 13,
    lineHeight: '22px'
  }
};

class UserCard extends React.Component<MainProps, any> {
  public render() {
    const { user } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.first}>
          <div style={styles.avatar}>
            <img width={60} src={user.get('avatar_url')}/>
          </div>
          <div style={styles.login}>{ user.get('login') }</div>
          <div style={styles.company}>{ user.get('company') }</div>
          <div style={styles.location}>{ user.get('location') }</div>
        </div>
        <div style={styles.bio}>
          { user.get('bio') }
        </div>
      </div>
    );
  }
}

export default UserCard;
