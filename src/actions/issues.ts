import { get } from '../fetcher';
import { List } from 'immutable';
import { ADD_ISSUE } from '../constants/issues';

function add(issues, repoId) {
  return dispatch => {
    dispatch({
      payload: issues,
      repoId,
      type: ADD_ISSUE
    });
  };
}

export const getIssues = (repository: string, repoId: string) => {
  return dispatch => {
    get(`repos/${repository}/issues`, {})
      .then((issues: List<any>) => add(issues, repoId)(dispatch));
  };
};
