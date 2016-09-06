import { get } from '../fetcher';
import { List } from 'immutable';
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
  };
}

export const fetchAllIssues = (repositories: List<any>) => {
  return dispatch => {
    return Promise.all(repositories.map(repo =>
      getIssuesReq(repo.get('full_name'), repo.get('id'))(dispatch)
    ).toArray())
    .then((res) => {
      const issues = List(res).flatten(1).toList();
      return serializeIssues(issues)(dispatch);
    });
  };
};

export const fetchIssues = (repository: string, repoId: string, page?: string) => {
  return dispatch =>
    getIssuesReq(repository, repoId, page)(dispatch)
      .then((issues: List<any>) => serializeIssues(issues)(dispatch));
};

export const serializeIssues = (issues: List<any>) => {
  return dispatch => {
    let formattedIssues = issues.map(issue => {
      const issueBis = issue.update('labels', labels =>
        labels.map(label => label.set('id', hash(label.get('name').toLowerCase())))
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

    if (labels.size > 0) {
      addLabels(labels)(dispatch);
    }

    if (formattedIssues.size > 0) {
      add(formattedIssues)(dispatch);
    }

    return formattedIssues;
  };
};

export const getIssuesReq = (repository: string, repoId: string, page?: string) => {
  return dispatch =>
    get(`repos/${repository}/issues`, { page })
      .then((issues: List<any>) => issues.map(issue => issue.set('repositoryId', repoId)).toList());
};
