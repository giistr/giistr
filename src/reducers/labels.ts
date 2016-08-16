import { OrderedMap, List, Map } from 'immutable';
import { ADD_LABEL } from '../constants/labels';

const initialState: OrderedMap<number, Label> = OrderedMap<number, Label>();

export type Label = Map<string, string>;

export interface LabelAction {
  type: string;
  payload?: List<Label>;
}

export default (state = initialState, action: LabelAction) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_LABEL:
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
