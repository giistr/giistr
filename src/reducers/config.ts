import { Map } from 'immutable';
import { START_LOADING, STOP_LOADING } from '../constants/config';

const initialState: Map<string, any> = Map<string, any>({
  loading: true
});

export interface ConfigAction {
  type: string;
}

export default (state = initialState, action: ConfigAction) => {
  const { type } = action;

  switch (type) {
    case START_LOADING:
      return state.merge({ loading: true });
    case STOP_LOADING:
      return state.merge({ loading: false });
    default:
      return state;
  }
};
