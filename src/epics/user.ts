import { Observable } from 'rxjs/Observable';
import { get, post } from '../fetcher';
import { combineEpics } from 'redux-observable';
import {
  FETCH_USER,
  OAUTH_USER,
  FETCH_GITHUB_TOKEN,
  ADD_USER
} from '../constants/user';
import { oauthUser, addUser } from '../actions/user';
import { getAllTags } from '../actions/tags';
import { getAllApiRepository } from '../actions/repositories';

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

const oauthUserEpic = (action$) => (
  action$
    .ofType(OAUTH_USER)
    .concatMap(({ token }) =>
      get({
        endpoint: 'user',
        params: { access_token: token }
      })
      .map((user) =>
        addUser(
          user.set('access_token', token)
        )
      )
    )
);

const fetchUserEpic = (action$) => (
  action$
    .ofType(FETCH_USER)
    .flatMap(({ username }) =>
      get({ endpoint: `users/${username}` })
    )
    .map(addUser)
);

const postFetchUserEpic = (action$) => (
  action$
    .ofType(ADD_USER)
    .flatMap(() =>
      Observable.of(
        getAllApiRepository(),
        getAllTags()
      )
    )
);

export default combineEpics(fetchTokenEpic, oauthUserEpic, fetchUserEpic, postFetchUserEpic);
