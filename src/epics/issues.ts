import { get } from '../fetcher';
import {
  FETCH_ISSUES
} from '../constants/issues';
// import {}
const fetchIssuesEpic = (action$, state) => (
  action$
    .ofType(FETCH_ISSUES)
    .flatMap(({ repoId, page }) =>
      get({
        endpoint: `repos/${state.getIn(['repository', repoId, 'full_name'])}/issues`,
        params: { page }
      })
    )
    .map(issues =>
      // Process issues and add them
      ({})
    )
)

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
