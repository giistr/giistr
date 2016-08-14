import { combineReducers } from 'redux-immutable';
import repositoryReducer from './repository';
import issuesReducer from './issues';
import userReducer from './user';

export default combineReducers({
  issues: issuesReducer,
  repository: repositoryReducer,
  user: userReducer
});
