import { OrderedMap, List, Map } from 'immutable';
import { ADD_REPO } from '../constants/repos';

export type Repository = Map<string, string|number>;

export interface RepositoryAction {
  type: string;
  payload?: List<Repository>;
}

const initialState: OrderedMap<number, Repository> = OrderedMap<number, any>();

export default (state = initialState, action: RepositoryAction) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_REPO:
      if(List.isList(payload)) {
        const _payload = payload.reduce((acc, next) => {
          return acc.set(next.get('id'), next);
        }, OrderedMap<any, any>());

        return state.merge(_payload);
      }

    default:
      return state;
  }
}
