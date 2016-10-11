import {
  ADD_REPO,
  CLEAR_REPO,
  FETCH_USER_REPOS,
  FETCH_ALL_REPOS,
  FETCH_TOTAL_REPO_STARRED
} from '../constants/repos';

export const clear = () => ({
  type: CLEAR_REPO
});

export const AddRepos = repos => ({
  payload: repos,
  type: ADD_REPO
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
