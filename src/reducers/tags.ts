import { Map } from 'immutable';
import { SET_TAGS } from '../constants/tags';

export interface TagAction {
  payload?: any;
  type: string;
};

const initialState = Map<string, string>();

export default (state = initialState, action: TagAction) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};
