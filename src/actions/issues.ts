import { get } from '../fetcher';
import { List, Map } from 'immutable';
import { ADD_ISSUE } from '../constants/issues';
import { ADD_LABEL } from '../constants/labels';
import * as hash from 'object-hash';

function add(issues, repoId) {
  return dispatch => {
    dispatch({
      payload: issues,
      repoId,
      type: ADD_ISSUE
    });
  };
}

function addLabels(labels) {
  return dispatch => {
    dispatch({
      payload: labels,
      type: ADD_LABEL
    });
  }
}

export const getIssues = (repository: string, repoId: string) => {
  return dispatch => {
    return get(`repos/${repository}/issues`, {})
      .then((issues: List<any>) => {
        let formattedIssues = issues.map(issue => {
          const issueBis = issue.update('labels', labels =>
            labels.map(label => label.set('id', hash(label.toObject())))
          );

          return issueBis.set('labelsIds', issueBis.get('labels').map(label => label.get('id')));
        });

        const labels = formattedIssues.map(issue =>
          issue.get('labels')
        ).flatten(1);

        formattedIssues = formattedIssues.map(issue => issue.remove('labels'));

        addLabels(labels)(dispatch);
        add(formattedIssues, repoId)(dispatch);
        return formattedIssues;
      });
  };
};
