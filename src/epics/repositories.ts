import "rxjs/add/operator/catch";

import { get } from "../fetcher";
import { combineEpics, ofType } from "redux-observable";
import { of, forkJoin } from "rxjs";
import { Range, List } from "immutable";
import {
  FETCH_USER_REPOS,
  FETCH_ALL_REPOS,
  FETCH_TOTAL_REPO_STARRED
} from "../constants/repos";
import { AddRepos } from "../actions/repositories";
import { append } from "../actions/user";
import {
  setError,
  stopLoading,
  incrementPagination,
  setReposLimit
} from "../actions/config";
import { flatMap } from "rxjs/operators";

const fetchReposEpic = action$ =>
  action$.pipe(
    ofType(FETCH_USER_REPOS),
    flatMap(({ username, page }) =>
      get({
        endpoint: `users/${username}/starred`,
        params: { page }
      })
    ),
    flatMap((repos: any) => {
      const actions = [AddRepos(repos), incrementPagination()];

      if (repos.size % 30 !== 0) {
        actions.push(setReposLimit());
      }

      return of(...actions);
    })
    //.catch(err => of(setError(err), stopLoading()))
  );

const fetchTotalReposLengthEpic = action$ =>
  action$.pipe(
    ofType(FETCH_TOTAL_REPO_STARRED),
    flatMap(({ username }) =>
      get({
        endpoint: `users/${username}/starred`,
        params: { per_page: 1 },
        resHeader: true
      })
        .map(headers => {
          const reg = /rel="next", <.*&page=(\d+)>; rel="last"/i;
          const len = parseInt(headers.get("link").match(reg)[1], 10);
          return append("starred", len);
        })
        .catch(err => of(setError(err), stopLoading()))
    )
  );

const fetchAllRepos = (action$, { getState }) =>
  action$.pipe(
    ofType(FETCH_ALL_REPOS),
    flatMap(({ username, startPage }) => {
      const userTotalRepos = getState().user.get("starred");
      const totalPages = Math.ceil(userTotalRepos / 30) + 1;

      return forkJoin(
        ...Range(startPage, totalPages)
          .map(page =>
            get({
              endpoint: `users/${username}/starred`,
              params: { page }
            })
          )
          .toArray()
      )
        .map(repos => AddRepos(List(repos).flatten(1)))
        .catch(err => of(setError(err), stopLoading()));
    })
  );

export default combineEpics(
  fetchReposEpic,
  fetchTotalReposLengthEpic,
  fetchAllRepos
);
