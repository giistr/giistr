import { OrderedMap, List, Map, fromJS } from 'immutable';
import { ADD_ISSUE } from '../constants/issues';

declare var process: any;
const env = process.env.NODE_ENV;
let initialState: OrderedMap<number, Issue>;

// Move the dev logic to a separated service that inject all the mocked data
if(env === 'dev') {
  /// <reference path="require.d.ts" />
  const repositories = fromJS(require('!json!../mock-data/issues.json'));
  initialState = repositories.reduce((acc, next) => {
    return acc.set(next.get('id'), next);
  }, OrderedMap<any, Issue>());

} else {
  initialState = OrderedMap<number, Issue>();
}

export type Issue = Map<string, any>;

export interface IssueAction {
  type: string;
  payload?: List<Issue>;
  repoId: string;
}

export default (state = initialState, action: IssueAction) => {
  const { type, payload, repoId } = action;

  switch (type) {
    case ADD_ISSUE:
      if (List.isList(payload)) {
        const payloadBis = payload.reduce((acc, next) => {
          return acc.set(next.get('id'), next.set('repoId', repoId));
        }, OrderedMap<any, any>());

        return state.merge(payloadBis);
      }

    default:
      return state;
  }
};
