import { get } from '../fetcher';
import { ADD_USER, CLEAR_USER } from '../constants/user';
import { Map } from 'immutable';
import { User } from '../reducers/user';

export function clear() {
  return dispatch => {
    dispatch({
      type: CLEAR_USER
    });
  };
}

function add(user: User) {
  return dispatch => {
    dispatch({
      payload: user,
      type: ADD_USER
    });
  };
}

export const getUser = (username) => {
  return dispatch => {
    return get(`users/${username}`, {})
      .then((user: User) => {
        add(user)(dispatch);
        return user;
      })
      .catch(() => {
        return add(Map({
          login: username,
          isWrong: true
        }))(dispatch);
      });
  };
};
