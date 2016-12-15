import { get } from '../fetcher';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { Range, List } from 'immutable';
import {
  FETCH_USER_REPOS,
  FETCH_ALL_REPOS,
  FETCH_TOTAL_REPO_STARRED,
  FETCH_MULTIPLE_REPOS
} from '../constants/repos';

import { AddRepos, setRegistration, fetchMultipleRepos } from '../actions/repositories';
import { append } from '../actions/user';
import {
  setError,
  stopLoading,
  incrementPagination,
  setReposLimit
} from '../actions/config';

const fetchMultipleRepoEpic = action$ => (
  action$
    .ofType(FETCH_MULTIPLE_REPOS)
    .flatMap((ownerRepos: string[][]) => (
      Observable.forkJoin(
        ...ownerRepos.map(orMap =>
          get({
            endpoint: `users/${orMap[0]}/${orMap[1]}`
          })
        )
      )
    ))
    .map(repos => AddRepos(List(repos).flatten(1)))
);

const fetchReposEpic = action$ => (
  action$
    .ofType(FETCH_USER_REPOS)
    .flatMap(({ username, page }) =>
      get({
        endpoint: `users/${username}/starred`,
        params: { page }
      })
      .flatMap(repos => {
        const actions = [
          AddRepos(repos),
          incrementPagination()
        ];

        if (repos.size % 30 !== 0) {
          actions.push(setReposLimit());
        }

        return Observable.of(...actions);
      })
      .catch(err =>
        Observable.of(
          setError(err),
          stopLoading()
        )
      )
    )
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
      .map(headers => {
        const reg = /rel="next", <.*&page=(\d+)>; rel="last"/i;
        const len = parseInt(headers.get('link').match(reg)[1], 10);
        return append('starred', len);
      })
      .catch(err =>
        Observable.of(
          setError(err),
          stopLoading()
        )
      )
    ))
);

const fetchAllRepos = (action$, { getState }) => (
  action$
    .ofType(FETCH_ALL_REPOS)
    .flatMap(({ username, startPage }) => {
      const userTotalRepos = getState().getIn([ 'user', 'starred' ]);
      const totalPages = Math.ceil(userTotalRepos / 30) + 1;

      return Observable.forkJoin(
        ...Range(startPage, totalPages)
          .map((page) =>
            get({
              endpoint: `users/${username}/starred`,
              params: { page }
            })
          )
          .toArray()
      )
      .map(repos => AddRepos(List(repos).flatten(1)))
      .catch(err =>
        Observable.of(
          setError(err),
          stopLoading()
        )
      );
    })
);

// TODO: Factorise the URL and handle the fetch of multiple repositories
const fetchRegisteredRepos = (action$, { getState }) => (
  action$
    .filter(({ type }) => type === FETCH_ALL_REPOS || type === FETCH_USER_REPOS)
    .flatMap(() =>
      get({
        fullEndpoint: `https://api.giistr.io/api/v1/repos`,
        allocatedApi: true
      })
    )
    .flatMap((registeredRepos) => {
      const stateRepos = getState().get('repository');
      const reposToFetch = registeredRepos.filter(rr => !!stateRepos.get(rr.get('github_repo_id')));

      if (reposToFetch.size) {
        // return fetchMultipleRepos();
      }

      return Observable.of(List());
    })
    .map(setRegistration)
);

export default combineEpics(
  fetchReposEpic,
  fetchTotalReposLengthEpic,
  fetchAllRepos,
  fetchRegisteredRepos,
  fetchMultipleRepoEpic
);
