import { Map } from 'immutable';
import {
  START_LOADING,
  STOP_LOADING,
  ERROR
} from '../constants/config';

const initialState: Map<string, any> = Map<string, any>({
  loading: false,
  error: null
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
    default:
      return state;
  }
};
