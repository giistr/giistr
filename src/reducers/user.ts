import { Map, Iterable, fromJS } from 'immutable';
import { ADD_USER, CLEAR_USER } from '../constants/user';

export type User = Map<string, string|number>;

export interface UserAction {
  payload?: User;
  type: string;
};

const initialState: User = fromJS(get('user')) || Map<string, string | number>();

function save(key: string, obj: any) {
  localStorage.setItem(key, JSON.stringify(typeof obj.toJS === "function" ? obj.toJS() : obj));
}

function get(key: string): any {
  const str = localStorage.getItem(key);

  if (!str) {
    return undefined;
  }

  try {
    return JSON.parse(str);
  } catch(err) {
    return undefined;
  }
}

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
