import {
  ADD_FILTER,
  REMOVE_FILTER,
  RESET_FILTER,
  REPLACE_FILTER
} from '../constants/filters';

export const add = (key: string, payload: string) => {
  return dispatch => {
    return dispatch({
      payload,
      key,
      type: ADD_FILTER
    });
  };
};

export const remove = (key: string, payload: string) => {
  return dispatch => {
    return dispatch({
      payload,
      key,
      type: REMOVE_FILTER
    });
  };
};

export const reset = (key: string) => {
  return dispatch => {
    return dispatch({
      key,
      type: RESET_FILTER
    });
  };
};

export const resetAll = () => {
  return dispatch => dispatch({ type: RESET_FILTER });
}

export const replace = (key: string, payload: string | boolean) => {
  return dispatch => {
    return dispatch({
      key,
      type: REPLACE_FILTER,
      payload
    });
  };
};
