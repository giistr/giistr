import { List } from 'immutable';
import { ASSOCIATE_TAG } from '../constants/registered-repositories';
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

export const associateTagToRepo = (rrId: string, tags: List<string> | string) => ({
  type: ASSOCIATE_TAG,
  rrId,
  tags
});
