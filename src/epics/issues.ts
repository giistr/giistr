import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/zip';

import { get } from '../fetcher';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import hash from 'object-hash';
import { List } from 'immutable';
import { FETCH_ISSUES } from '../constants/issues';
import { ADD_REPO } from '../constants/repos';
import { add, addLabels, fetchIssues } from '../actions/issues';
import { stopLoading } from '../actions/config';

const serializeIssuesLabels = issues => {
  let formattedIssues = issues.map(issue => {
    const issueBis = issue.update('labels', labels =>
      labels.map(label =>
        label.set('id', hash(label.get('name').toLowerCase()))
      )
    );

    return issueBis.set(
      'labelsIds',
      issueBis.get('labels').map(label => label.get('id'))
    );
  });

  const labels = formattedIssues
    .map(issue => issue.get('labels'))
    .flatten(1)
    .toList();

  formattedIssues = formattedIssues.map(issue => issue.remove('labels'));

  return {
    formattedIssues,
    labels
  };
};

const reposToIssuesEpic = action$ =>
  action$
    .ofType(ADD_REPO)
    .filter(({ payload }) => List.isList(payload))
    .map(({ payload }) => fetchIssues(payload.map(repo => repo.get('id')), 1));

const fetchMapIssues = (reposIds: List<string>, state: any, page: number) =>
  Observable.forkJoin(
    ...reposIds
      .map(id =>
        get({
          endpoint: `repos/${state.repository.getIn([id, 'full_name'])}/issues`,
          params: { page }
        })
      )
      .toArray()
  ).map(issues => {
    return List(issues)
      .map((issueArr: any, index) => {
        return issueArr.map(issue =>
          issue.set('repositoryId', reposIds.get(index))
        );
      })
      .flatten(1);
  });

const fetchMapIssue = (repoId: string, state: any, page: number) =>
  get({
    endpoint: `repos/${state.repository.getIn([repoId, 'full_name'])}/issues`,
    params: { page }
  }).map(issues => issues.map(issue => issue.set('repositoryId', repoId)));

const fetchIssuesEpic = (action$, store) =>
  action$
    .ofType(FETCH_ISSUES)
    .flatMap(({ repoId, page }) => {
      if (List.isList(repoId)) {
        return fetchMapIssues(repoId as List<string>, store.value, page);
      }

      return fetchMapIssue(repoId as string, store.value, page);
    })
    .flatMap(issues => {
      const { formattedIssues, labels } = serializeIssuesLabels(issues);

      const actions = [add(formattedIssues), addLabels(labels), stopLoading()];

      return Observable.of(...actions);
    });

export default combineEpics(reposToIssuesEpic, fetchIssuesEpic);
