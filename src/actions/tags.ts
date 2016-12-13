import {
  GET_ALL_TAGS,
  SET_TAGS,
  POST_TAG
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
