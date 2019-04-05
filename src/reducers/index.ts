import { combineReducers } from 'redux';
import repositoryReducer from './repository';
import issuesReducer from './issues';
import userReducer from './user';
import labelReducer from './labels';
import filterReducer from './filters';
import locationReducer from './location';
import configReducer from './config';
import { connectRouter } from 'connected-react-router';

export default (history: any) =>
  combineReducers({
    issues: issuesReducer,
    repository: repositoryReducer,
    user: userReducer,
    label: labelReducer,
    filters: filterReducer,
    location: locationReducer,
    router: connectRouter(history),
    config: configReducer
  });
