import * as React from 'react';
import { bindActionCreators } from 'redux';
import { oauthUser, fetchGithubToken } from '../actions/user';
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
  oauthUser: any;
  fetchGithubToken: any;
  user: Map<string, string | number>;
};

const styles = {
  container: {
    position: 'absolute',
    top: 80,
    bottom: 0,
    left: 0,
    right: 0,
    margin: '0px auto',
    maxWidth: 1200,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0px 40px'
  } as React.CSSProperties,
  mainTitle: {
    fontSize: 34,
    lineHeight: '46px',
    fontWeight: 600,
    color: Colors.grey
  },
  subTitle: {
    display: 'inline-block',
    color: Colors.middleGrey,
    marginTop: 14,
    fontSize: 16,
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
  } as React.CSSProperties,
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
  wrapper: {
    borderBottom: `1px solid ${Colors.borderGrey}`,
    zIndex: 2,
    backgroundColor: 'white'
  },
  headerContainer: {
    maxWidth: 1200,
    margin: '0px auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30
  } as React.CSSProperties,
  footerItem: {
    padding: '0px 10px',
    fontSize: 11,
    color: Colors.middleGrey
  },
  about: {
    cursor: 'pointer',
    zIndex: 2,
    color: Colors.lightGrey
  },
  rightContainer: {
    display: 'flex'
  },
  first: {
    fontSize: 12,
    color: Colors.blueMiddle
  },
  loader: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: 'auto'
  }
};

const config = fromJS(require('!json!../config.json')); // tslint:disable-line
const githubOauth = `https://github.com/login/oauth/authorize?client_id=${config.get('clientId')}`;

class Landing extends React.Component<MainProps, any> {

  public state = {
    token: '',
    isTokenAccess: false
  };

  public componentWillMount() {
    const { fetchGithubToken, user } = this.props;

    if (user.size > 0) {
      this.redirectToApp(user);
    }

    const params = parse(location.search.replace('?', ''));
    if (params.code) {
      fetchGithubToken(params.code);
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
    const { oauthUser } = this.props;
    oauthUser(token);
  };

  private redirectToApp(user) {
    browserHistory.push('/home');
  }

  private onGetToken() {
    window.open('https://github.com/settings/tokens', '_blank');
  }

  private onClickAbout() {
    browserHistory.push('/about');
  }

  private renderMain() {
    const { isTokenAccess } = this.state;

    return (
      <div>
        <header style={styles.wrapper}>
          <div style={styles.headerContainer}>
            <Logo width={60}/>
            <div style={styles.first}>
              Giistr give you all the functionalities you need to quickly find the right issue.
            </div>
            <div style={styles.rightContainer}>
              <div
                style={Object.assign({}, styles.footerItem, styles.about)}
                onClick={this.onClickAbout}>
                About
              </div>
            </div>
          </div>
        </header>
        <BackgroundCover/>
        <TagCloud/>
        <LanguageCloud/>
        <div style={styles.container}>
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
        </div>
      </div>
    );
  }

  public render() {
    return (
      <div>
        {
          this.renderMain()
        }
      </div>
    );
  }
}

export default connect(state => ({ user: state.get('user') }),
dispatch => ({
  oauthUser: bindActionCreators(oauthUser, dispatch),
  fetchGithubToken: bindActionCreators(fetchGithubToken, dispatch)
}))(Landing);
