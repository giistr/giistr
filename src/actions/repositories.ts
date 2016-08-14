import { get } from '../fetcher';
import { ADD_REPO, CLEAR_REPO } from '../constants/repos';
import { List } from 'immutable';
import { Repository } from '../reducers/repository';

export function clear() {
  return dispatch => {
    dispatch({
      type: CLEAR_REPO
    });
  };
}

function add(repos) {
  return dispatch => {
    dispatch({
      payload: repos,
      type: ADD_REPO
    });
  };
}

export const getRepos = (username, page) => {
  return dispatch => {
    get(`users/${username}/starred`, { page })
      .then((repos: List<Repository>) => add(repos)(dispatch));
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
