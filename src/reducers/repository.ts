import { OrderedMap, List, Map } from 'immutable';
import { ADD_REPO, CLEAR_REPO } from '../constants/repos';
import { fromJS } from 'immutable';

declare var process: any;
const env = process.env.NODE_ENV;
const initialState: OrderedMap<number, Repository> = OrderedMap<number, Repository>();

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
