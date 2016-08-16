import { get, post } from '../fetcher';
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

export const oauthFromToken = access_token => {
  return dispatch => {
    return get('user', { access_token })
      .then((user: User) => {
        const userBis = user.set('access_token', access_token);
        add(userBis)(dispatch);
        return userBis;
      });
  };
};

export const githubOauthAction = (code, client_id, client_secret) => {
  const params = {
    code,
    client_id,
    client_secret
  };

  return dispatch => {
    return post(null, params, 'https://github.com/login/oauth/access_token')
      .then(res => {
        const ac = res.get('access_token');
        return oauthFromToken(ac)(dispatch);
      })
      .catch(err => {
        console.error(err);
      });
  };
};
