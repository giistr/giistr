import { OrderedMap } from 'immutable';

export type Repository = OrderedMap<string, any>;

export interface RepositoryAction {
  type: string;
  payload?: Repository;
}

export const ADD_REPO: string = 'ADD_REPO';

const initialState: Repository = OrderedMap<string, any>();

export default (state = initialState, action: RepositoryAction) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_REPO:
      return state.set(payload.get('id'), payload);
    default:
      return state;
  }
};
