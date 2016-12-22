import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { get, post } from '../fetcher';
import { addRegisteredRepositories } from '../actions/registered-repositories';
import { fetchMultipleRepos } from '../actions/repositories';
import { addTagToRepo } from '../actions/tags';
import {
  FETCH_USER_REPOS,
  FETCH_ALL_REPOS
} from '../constants/repos';
import { CREATE_REPOSITORY_ADD_TAG } from '../constants/registered-repositories';
import { Map } from 'immutable';

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
      const reposToFetch = registeredRepos.filter(rr => Map.isMap(stateRepos.get(rr.get('github_repo_id'))));

      const actions = [];
      if (reposToFetch.size) {
        actions.push(
          // Fetch all the github repositories not in the store but registered by the giistr API
          fetchMultipleRepos(
            reposToFetch.map(repo =>
              [repo.get('user_login'), repo.get('repository_name')]
            ).toArray()
          )
        );
      }

      actions.push(addRegisteredRepositories(registeredRepos));

      return Observable.of(...actions);
    })
);

const createRepoAddTag = (action$) => (
  action$
    .ofType(CREATE_REPOSITORY_ADD_TAG)
    .flatMap(({ repo, tagId }) =>
      post({
        fullEndpoint: `https://api.giistr.io/api/v1/repo`,
        allocatedApi: true,
        params: {
          'github_repo_id': repo.get('id'),
          'user_login': repo.getIn(['owner', 'login']),
          'repository_name': repo.get('name')
        }
      })
      .flatMap(rr =>
        Observable.of(addRegisteredRepositories(rr))
          .concat(() => Observable.of(addTagToRepo(rr.get('id'), tagId)))
      )
    )
);

export default combineEpics(
  fetchRegisteredRepos,
  createRepoAddTag
);
