import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { get } from '../fetcher';
import { addRegisteredRepositories } from '../actions/registered-repositories';
import { fetchMultipleRepos } from '../actions/repositories';
import {
  FETCH_USER_REPOS,
  FETCH_ALL_REPOS,
} from '../constants/repos';

const fetchRegisteredRepos = (action$, { getState }) => (
  action$
    .filter(({ type }) => type === FETCH_ALL_REPOS || type === FETCH_USER_REPOS)
    .flatMap(() =>
      get({
        fullEndpoint: `https://api.giistr.io/api/v1/repos`,
        allocatedApi: true
      })
    )
    .flatMap((registeredRepos) => {
      const stateRepos = getState().get('repository');
      const reposToFetch = registeredRepos.filter(rr =>
        !!stateRepos.find((sRepo) =>
          sRepo.get('name') === rr.get('github_repo_id') &&
          sRepo.getIn(['owner', 'login']) === rr.get('user_id')
        )
      );

      const actions = [];
      if (reposToFetch.size) {
        actions.push(
          fetchMultipleRepos(
            reposToFetch.map(repo =>
              [repo.get('user_id'), repo.get('github_repo_id')]
            ).toArray()
          )
        );
      }

      actions.push(addRegisteredRepositories(registeredRepos));

      return Observable.of(...actions);
    })
);

export default combineEpics(
  fetchRegisteredRepos
);
