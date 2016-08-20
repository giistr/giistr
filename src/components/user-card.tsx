import * as React from 'react';
import { User } from '../reducers/user';
import { Colors } from '../style';

const styles = {
  container: {
    margin: 20,
    display: 'flex'
  },
  first: {
    display: 'flex',
    alignItems: 'center',
    color: Colors.grey,
    fontSize: 14,
    marginRight: 40
  },
  login: {
    marginLeft: 10
  },
  avatar: {
    borderRadius: '50%',
    position: 'relative',
    border: `1px solid ${Colors.borderGrey}`,
    width: 40,
    height: 40
  },
  image: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: 34,
    maxHeight: 34
  },
  bio: {
    color: Colors.lightGrey,
    fontSize: 13,
    lineHeight: '22px'
  },
  item: {
    fontSize: 12,
    lineHeight: '18px',
    color: Colors.lightGrey,
    cursor: 'pointer',
    margin: '0px 10px'
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 30,
    borderLeft: `1px solid ${Colors.borderGrey}`
  }
};

class UserCard extends React.PureComponent<{ user: User; onLogout: Function; }, any> {

  public shouldComponentUpdate(nextProps) {
    return !nextProps.user.equals(this.props.user);
  }

  private onClickAbout() {

  }

  public render() {
    const { user, onLogout } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.first}>
          <div style={styles.avatar}>
            <img style={styles.image} src={user.get('avatar_url')}/>
          </div>

          <div style={styles.login}>
            <a href={user.get('html_url')} target="_blank">{ user.get('login') }</a>
          </div>
        </div>

        <div style={styles.menu}>
          <div style={styles.item} onClick={this.onClickAbout}>About giistr</div>
          <div style={styles.item} onClick={onLogout}>Sign out</div>
        </div>
      </div>
    );
  }
}

export default UserCard;
