import { OrderedMap } from 'immutable';
import * as Redux from 'redux';
import { Action } from '../interface';

const ADD_REPO = 'ADD_REPO';
const REMOVE_REPO = 'REMOVE_REPO';

type RepoState = OrderedMap<string, any>;

const reposReducer: Redux.Reducer<RepoState> = (state: RepoState, action: Action) => {

  const { type, payload } = action;

  switch(type) {
    case ADD_REPO:
      return state.set(payload.get("id"), payload);
    default:
      return state;
  }
}

export default reposReducer;
