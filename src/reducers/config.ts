import { Map } from 'immutable';
import {
  START_LOADING,
  STOP_LOADING,
  ERROR,
  INCREMENT_PAGINATION,
  SET_REPOS_LIMIT
} from '../constants/config';

const initialState: Map<string, any> = Map<string, any>({
  loading: false,
  error: null,
  page: 0,
  limit: false
});

export interface ConfigAction {
  type: string;
  payload: any;
}

export default (state = initialState, action: ConfigAction) => {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING:
      return state.merge({ loading: true });
    case STOP_LOADING:
      return state.merge({ loading: false });
    case ERROR:
      return state.set('error', payload);
    case INCREMENT_PAGINATION:
      return state.update('page', page => page + 1);
    case SET_REPOS_LIMIT:
      return state.set('limit', true);
    default:
      return state;
  }
};
