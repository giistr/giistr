import { OrderedMap, List, Map } from 'immutable';
import { ADD_ISSUE } from '../constants/issues';

export type Issue = Map<string, any>;

export interface IssueAction {
  type: string;
  payload?: List<Issue>;
  repoId: string
}

const initialState: OrderedMap<number, Issue> = OrderedMap<number, Issue>();

export default (state = initialState, action: IssueAction) => {
  const { type, payload, repoId } = action;
  switch (type) {
    case ADD_ISSUE:
      if(List.isList(payload)) {
        const _payload = payload.reduce((acc, next) => {
          return acc.set(next.get('id'), next.set('repoId', repoId));
        }, OrderedMap<any, any>());

        return state.merge(_payload);
      }

    default:
      return state;
  }
}
