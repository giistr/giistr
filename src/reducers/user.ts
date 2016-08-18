import { Map, fromJS } from 'immutable';
import { ADD_USER, CLEAR_USER } from '../constants/user';
import { get, save } from '../localStorage';

export type User = Map<string, string|number>;

export interface UserAction {
  payload?: User;
  type: string;
};

const initialState: User = fromJS(get('user')) || Map<string, string | number>();

export default (state = initialState, action: UserAction) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER:
      save('user', payload);
      return payload;
    case CLEAR_USER:
      return initialState;
    default:
      return state;
  }
};
