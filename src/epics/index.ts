import userEpics from './user';
import repositoryEpics from './repositories';
import issueEpics from './issues';
import configEpics from './config';
import { combineEpics } from 'redux-observable';

export default combineEpics(
  userEpics,
  issueEpics,
  repositoryEpics,
  configEpics
);
