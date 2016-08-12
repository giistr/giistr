import { Action } from '../interface';
import { get } from '../fetcher';

export const getRepos = username => {
  return dispatch => {
    get(`users/${username}/starred`, {}).then(res => {
      console.log(res);
    });
  }
};
