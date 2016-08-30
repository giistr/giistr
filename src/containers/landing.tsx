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
    fontSize: 40,
    lineHeight: '46px',
    fontWeight: 500,
    color: Colors.grey
  },
  subTitle: {
    display: 'inline-block',
    color: Colors.middleGrey,
    marginTop: 14,
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 400
  },
  interactive: {
    height: 160,
    display: 'flex',
    justifyContent: 'flex-start',
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
    marginBottom: 60
  },
  bottom: {
    display: 'flex'
  },
  howToToken: {
    marginLeft: 8
  },
  footerContainer: {
    maxWidth: 1200,
    margin: '0px auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },
  footerItem: {
    padding: '0px 10px',
    fontSize: 11,
    color: Colors.middleGrey
  },
  about: {
    cursor: 'pointer'
  },
  rightContainer: {
    display: 'flex'
  },
  first: {
    fontSize: 11,
    color: Colors.grey
  }
};

/// <reference path="require.d.ts" />
const config = fromJS(require('!json!../config.json')); // tslint:disable-line
const githubOauth = `https://github.com/login/oauth/authorize?client_id=${config.get('clientId')}`;

class Landing extends React.Component<MainProps, any> {

  public state = {
    token: '',
    isTokenAccess: false
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

  private onGetToken() {
    window.open('https://github.com/settings/tokens', '_blank');
  }

  private onClickAbout() {
    browserHistory.push('/about');
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
          <div style={styles.bottom}>
            <RawButton
              onClick={this.onToggleAccess}>
              {
                isTokenAccess ? 'Sign Up with Github' : 'Get unlimited access'
              }
            </RawButton>
            {
              isTokenAccess && (
                <RawButton
                  style={styles.howToToken}
                  onClick={this.onGetToken}>
                  How to get a token
                </RawButton>
              )
            }
          </div>
        </div>
        <footer>
          <div style={styles.footerContainer}>
            <div style={styles.first}>
              Giistr works on your way to do a pull of issues you liked and register to your localstorage.
            </div>
            <div style={styles.rightContainer}>
              <div style={styles.footerItem}>
                Giistr © 2016
              </div>
              <div
                style={Object.assign({}, styles.footerItem, styles.about)}
                onClick={this.onClickAbout}>
                About
              </div>
            </div>
          </div>
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
