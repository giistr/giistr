import { Set } from 'immutable';

export const ADD_FILTER: string = 'ADD_FILTER';
export const REMOVE_FILTER: string = 'REMOVE_FILTER';
export const RESET_FILTER: string = 'RESET_FILTER';
export const REPLACE_FILTER: string = 'REPLACE_FILTER';

export const pOptions = [
  'All days',
  'Last 5 days',
  'Last 30 days',
  'Last 2 months',
  'Last year'
];

export const languageDefaultOption = 'All languages';

export const FILTER_DEFAULT = {
  languages: Set<string>(),
  period: Set<number>([ pOptions[0] ]),
  labels: Set<string>(),
  withIssues: true,
  withoutAssignee: false,
  searchIssue: Set<string>([''])
};

export const FILTER_KEYS = Object.keys(FILTER_DEFAULT);
