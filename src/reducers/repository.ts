import { OrderedMap, List, Map } from 'immutable';
import { ADD_REPO, CLEAR_REPO } from '../constants/repos';
import { fromJS } from 'immutable';

declare var process: any;
const env = process.env.NODE_ENV;
let initialState: OrderedMap<number, Repository>;

// Move the dev logic to a separated service that inject all the mocked data
if(env === 'dev') {

  /// <reference path="require.d.ts" />
  const repositories = fromJS(require('!json!../mock-data/repositories.json'));
  initialState = repositories.reduce((acc, next) => {
    return acc.set(next.get('id'), next);
  }, OrderedMap<any, Repository>());

} else {
  initialState = OrderedMap<number, Repository>();
}

export type Repository = Map<string, string|number>;

export interface RepositoryAction {
  payload?: List<Repository>;
  type: string;
}

export default (state = initialState, action: RepositoryAction) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REPO:
      if (List.isList(payload)) {
        const payloadBis = payload.reduce((acc, next) => {
          return acc.set(next.get('id'), next);
        }, OrderedMap<any, Repository>());

        return state.merge(payloadBis);
      }

    case CLEAR_REPO:
      return OrderedMap<number, Repository>();

    default:
      return state;
  }
};
