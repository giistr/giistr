import userEpics from './user';
import repositoryEpics from './repositories';
import issueEpics from './issues';
import configEpics from './config';
import tagEpics from './tags';
import registeredRepositoriesEpics from './registered-repositories';

export default [
  userEpics,
  issueEpics,
  repositoryEpics,
  configEpics,
  tagEpics,
  registeredRepositoriesEpics
];
