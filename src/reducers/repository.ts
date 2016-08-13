import { OrderedMap, List, Map } from 'immutable';
import { ADD_REPO } from '../constants/repos';

export type Repository = Map<string, string|number>;

export interface RepositoryAction {
  payload?: List<Repository>;
  type: string;
}

const initialState: OrderedMap<number, Repository> = OrderedMap<number, any>();

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

    default:
      return state;
  }
};
