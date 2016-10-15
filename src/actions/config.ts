import {
  START_LOADING,
  STOP_LOADING,
  ERROR
} from '../constants/config';

export const startLoading = () => ({
  type: START_LOADING
});

export const stopLoading = () => ({
  type: STOP_LOADING
});

export const setError = err => ({
  type: ERROR,
  payload: err
});

export const stopError = () => ({
  type: ERROR,
  payload: null
});
