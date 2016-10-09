import { get } from '../fetcher';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/observable';
import * as hash from 'object-hash';
import { List } from 'immutable';
import {
  FETCH_ISSUES,
  ADD_ISSUE
} from '../constants/issues';
import { ADD_REPO } from '../constants/repos';
import { add, addLabels, fetchIssues } from '../actions/issues';

const reposToIssuesEpic = (action$) => (
  action$
    .ofType(ADD_REPO)
    .filter(({ payload }) => List.isList(payload))
    .flatMap(({ payload }) =>
      Observable.merge(
        payload.map(repo =>
          Observable.of(fetchIssues(repo.get('id'), 1))
        ).toArray()
      )
    )
);

const fetchIssuesEpic = (action$, { getState }) => (
  action$
    .ofType(FETCH_ISSUES)
    .flatMap(({ repoId, page }) =>
      get({
        endpoint: `repos/${getState().getIn(['repository', repoId, 'full_name'])}/issues`,
        params: { page }
      })
    )
    .map(issues => {
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

      return add(formattedIssues, labels);
    })
);

const createLabelsEpic = (action$) => (
  action$
    .ofType(ADD_ISSUE)
    .map(({ labels }) => addLabels(labels))
);

export default combineEpics(reposToIssuesEpic, fetchIssuesEpic, createLabelsEpic);

// Add label epics which is listening when adding issue and process them to store labels separatedely

// export const getIssuesReq = (repository: string, repoId: string, page?: string) => {
//   return dispatch =>
//     get({
//       endpoint: `repos/${repository}/issues`,
//       params: { page }
//     })
//     // .then((issues: List<any>) =>
//     //   issues.map(issue => issue.set('repositoryId', repoId)).toList()
//     // );
// };
