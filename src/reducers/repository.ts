import { OrderedMap, List, Map } from 'immutable';
import { ADD_REPO, CLEAR_REPO, SET_ISSUES_LIMIT } from '../constants/repos';

const initialState: OrderedMap<number, Repository> = OrderedMap<number, Repository>();

export type Repository = Map<string, string|number|boolean>;

export interface RepositoryAction {
  payload?: List<Repository>;
  type: string;
  repoId?: number;
}

export default (state = initialState, action: RepositoryAction) => {
  const { type, payload, repoId } = action;

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

    case SET_ISSUES_LIMIT:
      return state.update(repoId, repo =>
        repo.set('issuesLimit', true)
      );

    default:
      return state;
  }
};
