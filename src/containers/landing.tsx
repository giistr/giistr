import * as React from 'react';
import { getUser, githubOauthAction } from '../actions/user';
import { connect } from 'react-redux';
import { Map, fromJS } from 'immutable';
import { browserHistory } from 'react-router';
import { parse } from 'qs';

interface MainProps {
  dispatch: any;
  githubOauthAction: any;
  user: Map<string, string | number>;
};

const styles = {};

/// <reference path="require.d.ts" />
const config = fromJS(require('!json!../config.json'));
const githubOauth = `https://github.com/login/oauth/authorize?client_id=${config.get('clientId')}`;

class Landing extends React.Component<MainProps, any> {

  public state = {};

  public componentWillMount() {
    const { githubOauthAction, dispatch } = this.props;

    const params = parse(location.search.replace('?', ''));
    if (params.code) {
      dispatch(githubOauthAction(params.code, config.get('clientId'), config.get('clientSecret')))
    }
  }

  public render() {
    const { user } = this.props;

    return (
      <div>
        <a href={githubOauth}>Login with google</a>
      </div>
    );
  }
}

export default connect(state => ({ user: state.get('user') }),
dispatch => ({
  dispatch,
  githubOauthAction
}))(Landing);
