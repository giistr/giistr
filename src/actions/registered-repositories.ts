import { ADD_REGISTERED_REPOS } from '../constants/registered-repositories';

export const addRegisteredRepositories = (registeredRepos) => ({
  type: ADD_REGISTERED_REPOS,
  payload: registeredRepos
})
