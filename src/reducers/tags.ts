import { Map, List } from 'immutable';
import { SET_TAGS } from '../constants/tags';

export interface TagAction {
  payload?: any;
  type: string;
};

export type Tag = Map<string, string|number>;

const initialState = Map<string, string>();

export default (state = initialState, action: TagAction) => {
  const { type, payload } = action;

  switch (type) {

    case SET_TAGS:
      if (List.isList(payload)) {
        const payloadBis = payload.reduce((acc, next) => {
          return acc.set(next.get('id'), next);
        }, Map<any, Tag>());

        return state.merge(payloadBis);
      }

      return state.set(payload.get('id'), payload);

    default:
      return state;
  }
};
