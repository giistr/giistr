import { get } from '../fetcher';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import * as hash from 'object-hash';
import { List } from 'immutable';
import {
  FETCH_ISSUES
} from '../constants/issues';
import { ADD_REPO } from '../constants/repos';
import { add, addLabels, fetchIssues } from '../actions/issues';
import { stopLoading } from '../actions/config';

const reposToIssuesEpic = (action$) => (
  action$
    .ofType(ADD_REPO)
    .filter(({ payload }) => List.isList(payload))
    .flatMap(({ payload }) =>
      Observable.of(
        fetchIssues(
          payload.map(repo => repo.get('id')),
          1
        )
      )
    )
);

const fetchIssuesEpic = (action$, { getState }) => {
  let rId;

  return action$
    .ofType(FETCH_ISSUES)
    .flatMap(({ repoId, page }) => {
      rId = repoId;

      if (List.isList(repoId)) {
        return Observable.forkJoin(
          ...repoId.map(id =>
            get({
              endpoint: `repos/${getState().getIn(['repository', id, 'full_name'])}/issues`,
              params: { page }
            })
          ).toArray()
        );
      }

      return get({
        endpoint: `repos/${getState().getIn(['repository', repoId, 'full_name'])}/issues`,
        params: { page }
      });
    })
    .flatMap(issues => {
      if (List.isList(issues[0])) {
        issues = List(issues).map((issueArr: any, index) => {
          return issueArr.map(issue =>
            issue.set('repositoryId', rId.get(index))
          );
        }).flatten(1);
      } else {
        issues = issues.map(issue => issue.set('repositoryId', rId));
      }

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

      console.log('LABELLLLL', labels);

      return Observable.of(
        add(formattedIssues),
        addLabels(labels),
        stopLoading()
      );
    });
};

// const createLabelsEpic = (action$) => (
//   action$
//     .ofType(ADD_ISSUE)
//     .map(({ labels }) => addLabels(labels))
// );

export default combineEpics(reposToIssuesEpic, fetchIssuesEpic);
