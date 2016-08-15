import { get } from '../fetcher';
import { ADD_REPO, CLEAR_REPO } from '../constants/repos';
import { List } from 'immutable';
import { Repository } from '../reducers/repository';
import { getIssues } from './issues';

export function clear() {
  return dispatch => {
    dispatch({
      type: CLEAR_REPO
    });
  };
}

function add(repos) {
  return dispatch => {
    return dispatch({
      payload: repos,
      type: ADD_REPO
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
          dispatch(getIssues(repo.get('full_name'), repo.get('id')))
        ).toArray();

        return Promise.all(proms)
      });
  };
};

export const getAllRepos = (username, starting) => {
  return dispatch => {
    get(`users/${username}/starred`, { page: starting })
      .then((repos: List<Repository>) => {
        add(repos)(dispatch);
        if (repos.size >= 30) {
          dispatch(getAllRepos(username, starting + 1));
        }
      });
  };
};
