import {
  ADD_REPO,
  CLEAR_REPO,
  FETCH_USER_REPOS,
  FETCH_ALL_REPOS,
  FETCH_TOTAL_REPO_STARRED,
  GET_ALL_API_REPOS,
  FETCH_MULTIPLE_REPOS
} from '../constants/repos';

export const clear = () => ({
  type: CLEAR_REPO
});

export const AddRepos = repos => ({
  payload: repos,
  type: ADD_REPO
});

export const fetchMultipleRepos = (ownerRepos: string[][]) => ({
  type: FETCH_MULTIPLE_REPOS,
  ownerRepos
});

export const fetchRepos = (username: string, page: number) => ({
  type: FETCH_USER_REPOS,
  username,
  page
});

export const fetchTotalReposLength = (username: string) => ({
  type: FETCH_TOTAL_REPO_STARRED,
  username
});

export const fetchAllRepos = (username: string, startPage: number) => ({
  type: FETCH_ALL_REPOS,
  username,
  startPage
});

export const getAllApiRepository = () => ({
  type: GET_ALL_API_REPOS
});
