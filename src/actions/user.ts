import {
  ADD_USER,
  CLEAR_USER,
  APPEND_TO_USER,
  FETCH_GITHUB_TOKEN,
  OAUTH_USER,
  FETCH_USER
} from '../constants/user';
import { User } from '../reducers/user';

export const clear = () => ({
  type: CLEAR_USER
});

export const append = (key, value) => ({
  type: APPEND_TO_USER,
  payload: {
    key,
    value
  }
});

export const addUser = (user: User) => ({
  payload: user,
  type: ADD_USER
});

export const fetchGithubToken = (code: string) => ({
  type: FETCH_GITHUB_TOKEN,
  code
});

export const fetchUser = (username: string) => ({
  type: FETCH_USER,
  username
});

export const oauthUser = (token: string) => ({
  type: OAUTH_USER,
  token
});
