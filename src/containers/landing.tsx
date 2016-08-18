import * as React from 'react';
import { githubOauthAction, oauthFromToken } from '../actions/user';
import { connect } from 'react-redux';
import { Map, fromJS } from 'immutable';
import { browserHistory } from 'react-router';
import { parse } from 'qs';
import { Logo } from '../components/logo';
import { Colors } from '../style';
import { GithubButton } from '../components/github-button';
import TokenLogin from '../components/token-login';

interface MainProps {
  dispatch: any;
  githubOauthAction: any;
  oauthFromToken: any;
  user: Map<string, string | number>;
};

const styles = {
  container: {
    margin: '100px auto',
    maxWidth: 1200
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 100
  },
  subTitle: {
    display: 'inline-block',
    color: Colors.grey,
    marginTop: 30
  },
  square: {
    height: 24,
    width: 16,
    verticalAlign: 'middle',
    marginLeft: 6,
    marginBottom: 5,
    backgroundColor: Colors.blue,
    display: 'inline-block'
  },
  rateLimit: {
    fontSize: 12,
    color: Colors.lightGrey
  },
  titles: {
    marginTop: 100,
    marginBottom: 40
  }
};

/// <reference path="require.d.ts" />
const config = fromJS(require('!json!../config.json')); // tslint:disable-line
const githubOauth = `https://github.com/login/oauth/authorize?client_id=${config.get('clientId')}`;

class Landing extends React.Component<MainProps, any> {

  public state = {
    token: '',
    isTokenAccess: true
  };

  public componentWillMount() {
    const { githubOauthAction, dispatch, user } = this.props;

    if (user.size > 0) {
      this.redirectToApp(user);
    }

    const params = parse(location.search.replace('?', ''));
    if (params.code) {
      dispatch(githubOauthAction(params.code, config.get('clientId'), config.get('clientSecret')));
    }
  }

  public componentWillReceiveProps({ user }) {
    if (user.size > 0) {
      this.redirectToApp(user);
    }
  }

  private onToggleAccess = () => {
    this.setState({
      isTokenAccess: !this.state.isTokenAccess
    });
  };

  private onTokenLogin = () => {

  };

  private redirectToApp(user) {
    browserHistory.push(`/app/${user.get('login')}`);
  }

  private onChangeToken = (evt) => {
    const text = evt.target.value;

    this.setState({ token: text });
  };

  private onStart = () => {
    const { token } = this.state;
    const { oauthFromToken, dispatch } = this.props;

    dispatch(oauthFromToken(token));
  };

  public render() {
    const { isTokenAccess } = this.state;

    return (
      <div style={styles.container}>
        <Logo/>
        <div style={styles.titles}>
          <h1 style={styles.mainTitle}>Contribute to build the open-source world.</h1>
          <div>
            <h1 style={styles.subTitle}>
              Search, filter and help easily on the issues of the repositories you starred
            </h1>
            <div style={styles.square}></div>
          </div>
        </div>
        {
          isTokenAccess ? <TokenLogin onClickLogin={this.onTokenLogin}/> : (<GithubButton href={githubOauth}/>)
        }
        <div style={styles.rateLimit}>
          <span>
            {
              isTokenAccess ? 'Unlimited access using a dev token' : 'Limited access, 5,000 requests per hour'
            }
          </span>
          <span onClick={this.onToggleAccess}>
            {
              isTokenAccess ? 'Sign Up with Github' : 'Get unlimited access'
            }
          </span>
        </div>
        <footer>
        </footer>
      </div>
    );
  }
}

export default connect(state => ({ user: state.get('user') }),
dispatch => ({
  dispatch,
  githubOauthAction,
  oauthFromToken
}))(Landing);
