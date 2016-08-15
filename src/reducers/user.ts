import { Map } from 'immutable';
import { ADD_USER, CLEAR_USER } from '../constants/user';

export type User = Map<string, string|number>;

export interface UserAction {
  payload?: User;
  type: string;
};

const initialState: User = Map<string, string | number>();

export default (state = initialState, action: UserAction) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER:
      return payload;
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};
