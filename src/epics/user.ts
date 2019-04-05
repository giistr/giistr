import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import { get, post } from '../fetcher';
import { combineEpics } from 'redux-observable';
import { FETCH_USER, OAUTH_USER, FETCH_GITHUB_TOKEN } from '../constants/user';
import { oauthUser, addUser } from '../actions/user';

const fetchTokenEpic = action$ =>
  action$
    .ofType(FETCH_GITHUB_TOKEN)
    .mergeMap(({ code }) =>
      post({
        fullEndpoint: '/api/github-login',
        preventBody: true,
        params: { code }
      })
    )
    .map(res => oauthUser(res.get('access_token')));

const oauthUserEpic = action$ =>
  action$.ofType(OAUTH_USER).concatMap(({ token }) =>
    get({
      endpoint: 'user',
      params: { access_token: token }
    }).map(user => addUser(user.set('access_token', token)))
  );

const fetchUserEpic = action$ =>
  action$
    .ofType(FETCH_USER)
    .mergeMap(({ username }) => get({ endpoint: `users/${username}` }))
    .map(addUser);

export default combineEpics(fetchTokenEpic, oauthUserEpic, fetchUserEpic);
