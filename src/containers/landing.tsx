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
import { BackgroundCover } from '../components/background-cover';
import { TagCloud } from '../components/tag-cloud';
import { LanguageCloud } from '../components/language-cloud';
import { BlinkSquare } from '../components/blink-square';
import { RawButton } from '../components/raw-button';

interface MainProps {
  dispatch: any;
  githubOauthAction: any;
  oauthFromToken: any;
  user: Map<string, string | number>;
};

const styles = {
  container: {
    margin: '0px auto',
    maxWidth: 1200,
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  mainTitle: {
    fontSize: 38,
    lineHeight: '44px',
    fontWeight: 'bold',
    color: Colors.grey
  },
  subTitle: {
    display: 'inline-block',
    color: Colors.middleGrey,
    marginTop: 30,
    fontSize: 16,
    fontWeight: 400
  },
  interactive: {
    height: 160,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    zIndex: 2,
    maxWidth: 360
  },
  rateLimit: {
    fontSize: 12,
    marginBottom: 10,
    color: Colors.middleGrey
  },
  titles: {
    marginTop: 80,
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
      dispatch(githubOauthAction(params.code));
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

  private onTokenLogin = token => {
    const { oauthFromToken, dispatch } = this.props;
    dispatch(oauthFromToken(token));
  };

  private redirectToApp(user) {
    browserHistory.push(`/app/${user.get('login')}`);
  }

  public render() {
    const { isTokenAccess } = this.state;

    return (
      <div style={styles.container}>
        <BackgroundCover/>
        <TagCloud/>
        <LanguageCloud/>
        <Logo/>
        <div style={styles.titles}>
          <h1 style={styles.mainTitle}>Contribute to build the open-source world.</h1>
          <div>
            <h1 style={styles.subTitle}>
              Search, filter and help easily on the issues of the repositories you starred
            </h1>
            <BlinkSquare/>
          </div>
        </div>
        <div style={styles.interactive}>
          <div style={styles.rateLimit}>
            {
              isTokenAccess ? 'Unlimited access using a token' : 'Limited access, 5,000 requests per hour'
            }
          </div>
          {
            isTokenAccess ? <TokenLogin onClickLogin={this.onTokenLogin}/> : (<GithubButton href={githubOauth}/>)
          }
          <RawButton
            onClick={this.onToggleAccess}>
            {
              isTokenAccess ? 'Sign Up with Github' : 'Get unlimited access'
            }
          </RawButton>
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
