import {
  GET_ALL_TAGS,
  GET_TAGS_REPO,
  SET_TAGS,
  POST_TAG,
  ADD_TAG_REPO
} from '../constants/tags';

export const getAllTags = () => ({
  type: GET_ALL_TAGS
});

export const setTags = tags => ({
  type: SET_TAGS,
  payload: tags
});

export const postTag = (name: string) => ({
  type: POST_TAG,
  name
});

export const addTagToRepo = (repoRegistrationId: string, tagId: string) => ({
  type: ADD_TAG_REPO,
  repoRegistrationId,
  tagId
});

export const getTagsRepo = (registeredRepos) => ({
  type: GET_TAGS_REPO,
  registeredRepos
});
