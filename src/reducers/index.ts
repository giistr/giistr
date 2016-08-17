import { combineReducers } from 'redux-immutable';
import repositoryReducer from './repository';
import issuesReducer from './issues';
import userReducer from './user';
import labelReducer from './labels';
import filterReducer from './filters';

export default combineReducers({
  issues: issuesReducer,
  repository: repositoryReducer,
  user: userReducer,
  label: labelReducer,
  filters: filterReducer
});
