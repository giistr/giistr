import { User } from './reducers/user';
import { fromJS } from 'immutable';
import { add as addRepositories } from './actions/repositories';
import { serializeIssues } from './actions/issues';

/// <reference path="require.d.ts" />
const issues = fromJS(require('!json!../data/issues.json')); // tslint:disable-line
const repositories = fromJS(require('!json!../data/repositories.json')); // tslint:disable-line

export function devDispatcher(dispatch: any, user: User) {
  return  new Promise((resolve, reject) => {
    setTimeout(() => {
      addRepositories(repositories)(dispatch);
      const iss = serializeIssues(issues)(dispatch);
      resolve(iss);
    }, 2000);
  });
}
