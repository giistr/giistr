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

// export const fetchTotalReposLength = (username) => {
//   return dispatch => {
//     return get({
//       endpoint: `users/${username}/starred`,
//       params: { per_page: 1 },
//       resHeader: true
//     })
//     // .then(headers => {
//     //   const reg = /rel="next", <.*&page=(\d+)>; rel="last"/i;
//     //   const len = parseInt(headers.get('link').match(reg)[1], 10);
//     //   return append('starred', len)(dispatch);
//     // });
//   };
// };

// export const getRepos = (username, page) => {
//   return dispatch => {
//     return get({
//       endpoint: `users/${username}/starred`,
//       params: { page }
//     })
//     // .then((repos: List<Repository>) => {
//     //   add(repos)(dispatch);
//     //   return repos;
//     // })
//     // .then((repos: List<any>) => {
//     //   const proms: Array<Promise<any>> = repos.map(repo =>
//     //     getIssuesReq(repo.get('full_name'), repo.get('id'))(dispatch)
//     //   ).toArray();

//     //   return Promise.all(proms);
//     // })
//     // .then((pArr: Array<any>) => {
//     //   const issues: List<any> = List(pArr).flatten(1).toList();
//     //   return serializeIssues(issues)(dispatch);
//     // });
//   };
// };
