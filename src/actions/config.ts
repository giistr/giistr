import {
  START_LOADING,
  STOP_LOADING
} from '../constants/config';

export const startLoading = () => dispatch => {
  return dispatch({
    type: START_LOADING
  });
};

export const stopLoading = () => dispatch => {
  return dispatch({
    type: STOP_LOADING
  });
};
