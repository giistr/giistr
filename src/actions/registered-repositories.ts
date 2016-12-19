import {
  ADD_REGISTERED_REPOS,
  CREATE_REPOSITORY_ADD_TAG
} from '../constants/registered-repositories';

export const addRegisteredRepositories = (registeredRepos) => ({
  type: ADD_REGISTERED_REPOS,
  payload: registeredRepos
});

export const createRepoAddTag = (repo: any, tagId: string) => ({
  type: CREATE_REPOSITORY_ADD_TAG,
  repo,
  tagId
});
