import { ADD_ISSUE, FETCH_ISSUES } from '../constants/issues';
import { ADD_LABEL } from '../constants/labels';

export const add = (issues: any) => ({
  payload: issues,
  type: ADD_ISSUE
});

export const addLabels = (labels: any) => ({
  payload: labels,
  type: ADD_LABEL
});

export const fetchIssues = (repoId: string, page?: number) => ({
  type: FETCH_ISSUES,
  repoId,
  page
});
