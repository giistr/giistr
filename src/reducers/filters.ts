import { Map, Set } from 'immutable';
import {
  ADD_FILTER,
  REMOVE_FILTER,
  RESET_FILTER,
  FILTER_DEFAULT,
  REPLACE_FILTER
} from '../constants/filters';

const initialState: Map<string, any> = Map<string, any>(FILTER_DEFAULT);

export interface IssueAction {
  type: string;
  key: string;
  payload: string;
}

export default (state = initialState, action: IssueAction) => {
  const { type, payload, key } = action;

  switch (type) {
    case ADD_FILTER:
      return state.update(key, filter =>
        filter.add(payload)
      );

    case REMOVE_FILTER:
      return state.update(key, filter =>
        filter.delete(payload)
      );

    case RESET_FILTER:
      return state.update(key, filter =>
        initialState.get(key)
      );

    case REPLACE_FILTER:
      return state.update(key, filter => {
        if (typeof filter === 'boolean') {
          return payload;
        }

        return Set([ payload ]);
      });

    default:
      return state;
  }
};
