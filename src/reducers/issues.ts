import { OrderedMap, List, Map } from 'immutable';
import { ADD_ISSUE } from '../constants/issues';

const initialState: OrderedMap<number, Issue> = OrderedMap<number, Issue>();

export type Issue = Map<string, any>;

export interface IssueAction {
  type: string;
  payload?: List<Issue>;
}

export default (state = initialState, action: IssueAction) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ISSUE:
      if (List.isList(payload)) {
        const payloadBis = payload.reduce((acc, next) => {
          return acc.set(next.get('id'), next);
        }, OrderedMap<any, any>());

        return state.merge(payloadBis);
      }

    default:
      return state;
  }
};
