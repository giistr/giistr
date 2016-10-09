import { get } from '../fetcher';
import { combineEpics } from 'redux-observable';
import {
  FETCH_USER_REPOS,
  FETCH_TOTAL_REPO_STARRED
} from '../constants/repos';
import { AddRepos } from '../actions/repositories';
import { append } from '../actions/user';

const fetchReposEpic = (action$) => (
  action$
    .ofType(FETCH_USER_REPOS)
    .flatMap(({ username, page }) =>
      get({
        endpoint: `users/${username}/starred`,
        params: { page }
      })
    )
    .map(AddRepos)
);

const fetchTotalReposLengthEpic = (action$) => (
  action$
    .ofType(FETCH_TOTAL_REPO_STARRED)
    .flatMap(({ username }) => (
      get({
        endpoint: `users/${username}/starred`,
        params: { per_page: 1 },
        resHeader: true
      })
    ))
    .map(headers => {
      const reg = /rel="next", <.*&page=(\d+)>; rel="last"/i;
      const len = parseInt(headers.get('link').match(reg)[1], 10);
      return append('starred', len);
    })
);

export default combineEpics(fetchReposEpic, fetchTotalReposLengthEpic);
