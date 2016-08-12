import { get } from '../fetcher';
import { ADD_REPO } from '../constants/repos';
import { List, Map } from 'immutable';
import { Repository } from '../reducers/repository';

function add(repos) {
  return dispatch => {
    dispatch({
      type: ADD_REPO,
      payload: repos
    });
  };
}

export const getRepos = username => {
  return dispatch => {
    get(`users/${username}/starred`, {})
      .then((repos: List<Repository>) => add(repos)(dispatch));
  }
};
