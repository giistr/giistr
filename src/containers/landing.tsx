import * as React from 'react';
import { githubOauthAction, oauthFromToken } from '../actions/user';
import { connect } from 'react-redux';
import { Map, fromJS } from 'immutable';
import { browserHistory } from 'react-router';
import { parse } from 'qs';
import { Logo } from '../components/logo';
import { Colors } from '../style';

interface MainProps {
  dispatch: any;
  githubOauthAction: any;
  oauthFromToken: any;
  user: Map<string, string | number>;
};

const styles = {
  container: {
    margin: '100px auto',
    maxWidth: 1000
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 100
  },
  subTitle: {
    display: 'inline-block',
    color: Colors.grey
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
  signup: {
    display: 'inline-block',
    color: Colors.blue,
    backgroundColor: Colors.blueBackground,
    border: `1px solid ${Colors.blueBorder}`,
    boxShadow: '0 1px 2px 0 rgba(20, 22, 36, 0.08)',
    borderRadius: 5,
    padding: '10px 60px',
    margin: '16px auto'
  },
  githubIcon: {
    display: 'inline-block',
    marginRight: 10,
    verticalAlign: 'middle',
    marginBottom: 4
  },
  oauthLabel: {
    verticalAlign: 'middle'
  }
};

/// <reference path="require.d.ts" />
const config = fromJS(require('!json!../config.json')); // tslint:disable-line
const githubOauth = `https://github.com/login/oauth/authorize?client_id=${config.get('clientId')}`;

class Landing extends React.Component<MainProps, any> {

  public state = {
    token: ''
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

    return (
      <div style={styles.container}>
        <Logo/>
        <div>
          <h1 style={styles.mainTitle}>Contribute to build the open-source world.</h1>
          <div>
            <h1 style={styles.subTitle}>
              Search, filter and help easily on the issues of the repositories you starred
            </h1>
            <div style={styles.square}></div>
          </div>

        </div>
        <a href={githubOauth} style={styles.signup}>
          <img src="assets/github.svg" style={styles.githubIcon}/>
          <span style={styles.oauthLabel}>Sign Up with Github</span>
        </a>
        <div style={styles.rateLimit}>Limited access, approximately 5,000 requests per hour</div>

        <input onChange={this.onChangeToken} type="text" placeholder="Enter token"/>
        <button onClick={this.onStart}>Start</button>

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
