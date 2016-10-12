import { get, post } from '../fetcher';
import { combineEpics } from 'redux-observable';
import {
  FETCH_USER,
  OAUTH_USER,
  FETCH_GITHUB_TOKEN
} from '../constants/user';
import { oauthUser, addUser } from '../actions/user';

const fetchTokenEpic = (action$) => (
  action$
    .ofType(FETCH_GITHUB_TOKEN)
    .flatMap(({ code }) =>
      post({
        fullEndpoint: '/api/github-login',
        preventBody: true,
        params: { code }
      })
    )
    .map(res => oauthUser(res.get('access_token')))
);

const oauthUserEpic = (action$) => {
  let horribleSideEffect;

  return action$
    .ofType(OAUTH_USER)
    .concatMap(({ token }) =>
      get({
        endpoint: 'user',
        params: { access_token: token }
      })
      .map((user) =>
        addUser(
          user.set('access_token', horribleSideEffect)
        )
      )
    );

};

const fetchUserEpic = (action$) => (
  action$
    .ofType(FETCH_USER)
    .flatMap(({ username }) =>
      get({ endpoint: `users/${username}` })
    )
    .map(addUser)
);

export default combineEpics(fetchTokenEpic, oauthUserEpic, fetchUserEpic);
