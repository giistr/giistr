import { get } from '../fetcher';
import { List } from 'immutable';
import { ADD_ISSUE } from '../constants/issues';

function add(issues, repoId) {
  return dispatch => {
    dispatch({
      type: ADD_ISSUE,
      payload: issues,
      repoId
    });
  };
}

export const getIssues = (repository: string, repoId: string) => {
  return dispatch => {
    get(`repos/${repository}/issues`, {})
      .then((issues: List<any>) => add(issues, repoId)(dispatch));
  }
};
