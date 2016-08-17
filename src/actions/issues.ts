import { get } from '../fetcher';
import { List, Map, Set } from 'immutable';
import { ADD_ISSUE } from '../constants/issues';
import { ADD_LABEL } from '../constants/labels';
import * as hash from 'object-hash';

function add(issues) {
  return dispatch => {
    dispatch({
      payload: issues,
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

export const serializeIssues = (issues: List<any>) => {
  return dispatch => {
    let formattedIssues = issues.map(issue => {
      const issueBis = issue.update('labels', labels =>
        labels.map(label => label.set('id', hash(label.get("name").toLowerCase())))
      );

      return issueBis.set('labelsIds', issueBis.get('labels').map(label => label.get('id')));
    });

    const labels = formattedIssues
    .map(issue =>
      issue.get('labels')
    )
    .flatten(1)
    .toList();

    formattedIssues = formattedIssues.map(issue => issue.remove('labels'));

    addLabels(labels)(dispatch);
    add(formattedIssues)(dispatch);

    return formattedIssues;
  };
};

export const getIssuesReq = (repository: string, repoId: string) => {
  return get(`repos/${repository}/issues`, {})
    .then((issues: List<any>) => issues.map(issue => issue.set('repositoryId', repoId)));
}
