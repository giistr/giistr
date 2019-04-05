import {
  START_LOADING,
  STOP_LOADING,
  ERROR,
  INCREMENT_PAGINATION,
  SET_REPOS_LIMIT
} from '../constants/config';

export const startLoading = () => ({
  type: START_LOADING
});

export const stopLoading = () => ({
  type: STOP_LOADING
});

export const setError = (err: any) => ({
  type: ERROR,
  payload: err
});

export const stopError = () => ({
  type: ERROR,
  payload: null
});

export const incrementPagination = () => ({
  type: INCREMENT_PAGINATION
});

export const setReposLimit = () => ({
  type: SET_REPOS_LIMIT
});
