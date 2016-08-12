import { get } from '../fetcher';
import { ADD_REPO } from '../constants/repos';
import { List, Map } from 'immutable';

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
      .then((repos: List<Map<string, string|number>>) => add(repos)(dispatch));
  }
};
