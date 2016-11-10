import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import repositoryReducer from './repository';
import issuesReducer from './issues';
import userReducer from './user';
import labelReducer from './labels';
import filterReducer from './filters';
import locationReducer from './location';
import configReducer from './config';
import tagReducer from './tags';

export default combineReducers({
  issues: issuesReducer,
  repository: repositoryReducer,
  user: userReducer,
  label: labelReducer,
  filters: filterReducer,
  location: locationReducer,
  routing: routerReducer,
  config: configReducer,
  tag: tagReducer
});
