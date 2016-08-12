import { combineReducers } from 'redux-immutable';
import repositoryReducer from './repository';
import issuesReducer from './issues';

export default combineReducers({
  repository: repositoryReducer,
  issues: issuesReducer
});
