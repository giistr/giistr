import * as React from 'react';
import { getUser, githubOauthAction, oauthFromToken } from '../actions/user';
import { connect } from 'react-redux';
import { Map, fromJS } from 'immutable';
import { browserHistory } from 'react-router';
import { parse } from 'qs';

interface MainProps {
  dispatch: any;
  githubOauthAction: any;
  oauthFromToken: any;
  user: Map<string, string | number>;
};

const styles = {};

/// <reference path="require.d.ts" />
const config = fromJS(require('!json!../config.json'));
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
      dispatch(githubOauthAction(params.code, config.get('clientId'), config.get('clientSecret')))
    }
  }

  private componentWillReceiveProps({ user }) {
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
      <div>
        <a href={githubOauth}>Login with google</a>
        <input onChange={this.onChangeToken} type="text" placeholder="Enter token"/>
        <button onClick={this.onStart}>Start</button>
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
