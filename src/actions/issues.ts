import { ADD_ISSUE, FETCH_ISSUES } from '../constants/issues';
import { ADD_LABEL } from '../constants/labels';

export const add = (issues, labels) => ({
  payload: issues,
  labels,
  type: ADD_ISSUE
});

export const addLabels = labels => ({
  payload: labels,
  type: ADD_LABEL
});

export const fetchIssues = (repoId: string, page?: number) => ({
  type: FETCH_ISSUES,
  repoId,
  page
});

// export const fetchAllIssues = (repositories: List<any>) => {
//   return dispatch => {
//     return Promise.all(repositories.map(repo =>
//       getIssuesReq(repo.get('full_name'), repo.get('id'))(dispatch)
//     ).toArray())
//     // .then((res) => {
//     //   const issues = List(res).flatten(1).toList();
//     //   return serializeIssues(issues)(dispatch);
//     // });
//   };
// };

// export const fetchIssues = (repository: string, repoId: string, page?: string) => {
//   return dispatch =>
//     getIssuesReq(repository, repoId, page)(dispatch)
//       // .then((issues: List<any>) => serializeIssues(issues)(dispatch));
// };

// export const serializeIssues = (issues: List<any>) => {
//   return dispatch => {
//     let formattedIssues = issues.map(issue => {
//       const issueBis = issue.update('labels', labels =>
//         labels.map(label => label.set('id', hash(label.get('name').toLowerCase())))
//       );

//       return issueBis.set('labelsIds', issueBis.get('labels').map(label => label.get('id')));
//     });

//     // const labels = formattedIssues
//     // .map(issue =>
//     //   issue.get('labels')
//     // )
//     // .flatten(1)
//     // .toList();

//     // formattedIssues = formattedIssues.map(issue => issue.remove('labels'));

//     // if (labels.size > 0) {
//     //   addLabels(labels);
//     // }

//     if (formattedIssues.size > 0) {
//       add(formattedIssues);
//     }

//     return formattedIssues;
//   };
// };

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
