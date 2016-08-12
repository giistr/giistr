import { combineReducers } from 'redux-immutable';
import repositoryReducer from './repository';

export default combineReducers({
  repository: repositoryReducer,
});
