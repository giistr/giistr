import * as React from 'react';
import { User } from '../reducers/user';
import { Colors } from '../style';
import { browserHistory } from 'react-router';
import { fromJS } from 'immutable';
import NavItem from './nav-item';
import Nav from './nav';

const styles = {
  container: {
    margin: 20,
    display: 'flex',
    alignItems: 'center'
  },
  first: {
    display: 'flex',
    alignItems: 'center',
    color: Colors.grey,
    fontSize: 14,
    marginRight: 30
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
    height: 40,
    backgroundColor: '#ffffff',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  bio: {
    color: Colors.lightGrey,
    fontSize: 13,
    lineHeight: '22px'
  }
};

interface MainProps {
  user: User;
  onLogout: Function;
  location: any;
};

class UserCard extends React.PureComponent<MainProps, { active: number; }> {

  public state = {
    active: this.getActiveRoute(this.props.location)
  };

  private menu = fromJS([
    {
      title: 'Starred',
      action: this.onClickHome
    },
    {
      title: 'Lists',
      action: this.onClickList
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
    if (location.pathname.includes('home')) {
      return 0;
    }

    if (location.pathname.includes('lists')) {
      return 1;
    }

    if (location.pathname.includes('about')) {
      return 2;
    }
  }

  public shouldComponentUpdate(nextProps) {
    return !nextProps.user.equals(this.props.user);
  }

  private onClickList() {
    browserHistory.push('/lists');
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
            href={user.get('html_url') as string}
            target="_blank"
            style={Object.assign({}, styles.avatar, {
              backgroundImage: `url('${user.get('avatar_url')}')`
            })}/>
        </div>

        <Nav>
          {
            this.menu.map((el, index) =>
              <NavItem
                key={index}
                active={index === this.state.active}
                onClick={el.get('action')}
                >
                { el.get('title') }
              </NavItem>
            )
          }
        </Nav>
      </div>
    );
  }
}

export default UserCard;
