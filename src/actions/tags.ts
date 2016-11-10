import {
  GET_ALL_TAGS,
  SET_TAGS
} from '../constants/tags';

export const getAllTags = () => ({
  type: GET_ALL_TAGS
});

export const setTags = tags => ({
  type: SET_TAGS,
  payload: tags
});
