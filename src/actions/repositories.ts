import { get } from '../fetcher';
import { ADD_REPO, CLEAR_REPO } from '../constants/repos';
import { List } from 'immutable';
import { Repository } from '../reducers/repository';
import { getIssuesReq, serializeIssues, fetchAllIssues } from './issues';
import { append } from './user';

export function clear() {
  return dispatch => {
    dispatch({
      type: CLEAR_REPO
    });
  };
}

export function add(repos) {
  return dispatch => {
    return dispatch({
      payload: repos,
      type: ADD_REPO
    });
  };
}

export const fetchTotalReposLength = (username) => {
  return dispatch => {
    return get(`users/${username}/starred`, { per_page: 1 }, undefined, true)
      .then(str => {
        const len = parseInt(str.match(/rel="next", <.*&page=(\d+)>; rel="last"/i)[1]);
        append('starred', len)(dispatch);
      });
  };
}

export const getRepos = (username, page) => {
  return dispatch => {
    return get(`users/${username}/starred`, { page })
      .then((repos: List<Repository>) => {
        add(repos)(dispatch);
        return repos;
      })
      .then((repos: List<any>) => {
        const proms: Array<Promise<any>> = repos.map(repo =>
          getIssuesReq(repo.get('full_name'), repo.get('id'))(dispatch)
        ).toArray();

        return Promise.all(proms);
      })
      .then((pArr: Array<any>) => {
        const issues: List<any> = List(pArr).flatten(1).toList();
        return serializeIssues(issues)(dispatch);
      });
  };
};

export const fetchReposAndIssues = (username, starting) => {
  return dispatch => {
    return getAllRepos(username)(starting)(dispatch)
      .then(repos =>
        fetchAllIssues(repos)(dispatch)
      )
  };
};

export const getAllRepos = username => {
  let total = List<any>();

  const closure = starting => dispatch => {
    return get(`users/${username}/starred`, { page: starting })
      .then((repos: List<Repository>) => {
        add(repos)(dispatch);
        total = total.concat(repos).toList();

        if (repos.size >= 30) {
          return dispatch(closure(starting + 1));
        }

        return total;
      })
  };

  return closure;
};
