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
import { setIssuesLimit } from '../actions/repositories';
import { stopLoading } from '../actions/config';

const reposToIssuesEpic = (action$) => (
  action$
    .ofType(ADD_REPO)
    .filter(({ payload }) => List.isList(payload))
    .map(({ payload }) =>
      fetchIssues(payload.map(repo => repo.get('id')), 1)
    )
);

const fetchIssuesEpic = (action$, { getState }) => (
  action$
    .ofType(FETCH_ISSUES)
    .flatMap(({ repoId, page }) => {
      let res;

      if (List.isList(repoId)) {
        res = Observable.forkJoin(
          ...repoId.map(id =>
            get({
              endpoint: `repos/${getState().getIn(['repository', id, 'full_name'])}/issues`,
              params: { page }
            })
          ).toArray()
        );
      } else {
        res = get({
          endpoint: `repos/${getState().getIn(['repository', repoId, 'full_name'])}/issues`,
          params: { page }
        });
      }

      return res.map(issues => {
        if (List.isList(issues[0])) {
          return List(issues).map((issueArr: any, index) => {
            return issueArr.map(issue =>
              issue.set('repositoryId', repoId.get(index))
            );
          }).flatten(1);
        } else {
          return issues.map(issue => issue.set('repositoryId', repoId));
        }
      });
    })
    .flatMap(issues => {
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
      const issuesLimitAction = setIssuesLimit(formattedIssues.first().get('repositoryId'));

      const actions = [
        add(formattedIssues),
        addLabels(labels),
        stopLoading(),
        issuesLimitAction(issues.size % 30 !== 0)
      ];

      return Observable.of(...actions);
    })
);

export default combineEpics(reposToIssuesEpic, fetchIssuesEpic);
