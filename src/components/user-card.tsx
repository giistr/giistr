import * as React from 'react';
import { User } from '../reducers/user';
import { Colors } from '../style';
import { browserHistory } from 'react-router';
import * as StyleSheet from 'stilr';
import { fromJS } from 'immutable';

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
    overflow: 'hidden',
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
  menu: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 30,
    borderLeft: `1px solid ${Colors.borderGrey}`
  },
  active: {
    fontWeight: 'bold',
    color: Colors.blue
  }
};

const improvedStyle = StyleSheet.create({
  item: {
    fontSize: 12,
    lineHeight: '18px',
    color: Colors.lightGrey,
    cursor: 'pointer',
    margin: '0px 20px',
    ':hover': {
      color: Colors.middleGrey
    }
  }
});

interface MainProps {
  user: User;
  onLogout: Function;
  location: any;
};

class UserCard extends React.PureComponent<MainProps, any> {

  public state = {
    active: this.getActiveRoute(this.props.location)
  };

  private menu = fromJS([
    {
      title: 'Home',
      action: this.onClickHome
    },
    {
      title: 'About',
      action: this.onClickAbout
    },
    {
      title: 'Sign out',
      action: this.props.onLogout
    }
  ]);

  private getActiveRoute(location) {
    if (location.pathname.includes('app')) {
      return 0;
    }

    if (location.pathname.includes('about')) {
      return 1;
    }
  }

  public shouldComponentUpdate(nextProps) {
    return !nextProps.user.equals(this.props.user);
  }

  private onClickAbout() {
    browserHistory.push('/about');
  }

  private onClickHome() {
    browserHistory.push('/');
  }

  public render() {
    const { user } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.first}>
          <a
            href={user.get('html_url')}
            target="_blank"
            style={styles.avatar}>
            <img style={styles.image} src={user.get('avatar_url')}/>
          </a>
        </div>

        <div style={styles.menu}>
          {
            this.menu.map((el, index) =>
              <div
                key={index}
                style={index === this.state.active ? styles.active : {}}
                className={improvedStyle.item}
                onClick={el.get('action')}>
                { el.get('title') }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default UserCard;
