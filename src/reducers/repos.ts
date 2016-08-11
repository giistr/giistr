import * as Immutable from 'immutable';
import * as Redux from 'redux';

const ADD_REPO = 'ADD_REPO';
const REMOVE_REPO = 'REMOVE_REPO';

const reposReducer: Redux.Reducer<any> = (state: Immutable.Map<string, any>, action: any) => {
  switch( action.type ) {
      case ADD_REPO:
          return state;
      default:
          return state;
  }
}

export default reposReducer;
