import { Set } from 'immutable';

export const ADD_FILTER: string = 'ADD_FILTER';
export const REMOVE_FILTER: string = 'REMOVE_FILTER';
export const RESET_FILTER: string = 'RESET_FILTER';
export const REPLACE_FILTER: string = 'REPLACE_FILTER';

export const FILTER_DEFAULT = {
  languages: Set<string>(),
  period: Set<number>(),
  labels: Set<string>(),
  withIssues: true,
  withoutAssignee: false
};

export const FILTER_KEYS = Object.keys(FILTER_DEFAULT);
