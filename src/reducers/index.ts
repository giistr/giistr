import { combineReducers } from 'redux-immutable';
import repositoryReducer from './repository';
import issuesReducer from './issues';
import userReducer from './user';
import labelReducer from './labels';

export default combineReducers({
  issues: issuesReducer,
  repository: repositoryReducer,
  user: userReducer,
  label: labelReducer
});
