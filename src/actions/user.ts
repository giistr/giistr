import { get, post } from '../fetcher';
import { ADD_USER, CLEAR_USER, APPEND_TO_USER } from '../constants/user';
import { Map } from 'immutable';
import { User } from '../reducers/user';

export function clear() {
  return dispatch => {
    dispatch({
      type: CLEAR_USER
    });
  };
}

export function append(key, value) {
  return dispatch => {
    dispatch({
      type: APPEND_TO_USER,
      payload: {
        key,
        value
      }
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
    return get({
      endpoint: `users/${username}`
    })
    .then((user: User) => {
      add(user)(dispatch);
      return user;
    });
  };
};

export const oauthFromToken = accessToken => {
  return dispatch => {
    return get({
      endpoint: 'user',
      params: { access_token: accessToken }
    })
    .then((user: User) => {
      const userBis = user.set('access_token', accessToken);
      add(userBis)(dispatch);
      return userBis;
    });
  };
};

export const githubOauthAction = code => {
  return dispatch => {
    return post({
      fullEndpoint: '/api/github-login',
      preventBody: true,
      params: { code },
    })
    .then(res =>
      oauthFromToken(res.get('access_token'))(dispatch)
    )
    .catch(err => {
      throw err;
    });
  };
};
