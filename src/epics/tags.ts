import { combineEpics } from 'redux-observable';
import { get, post } from '../fetcher';
import { setTags } from '../actions/tags';
import {
  GET_ALL_TAGS,
  POST_TAG,
  ADD_TAG_REPO
} from '../constants/tags';

const endpoint = 'https://api.giistr.io/';

const getAllTags = action$ => (
  action$
    .ofType(GET_ALL_TAGS)
    .switchMap(() =>
      get({
        fullEndpoint: `${endpoint}api/v1/tags`,
        allocatedApi: true
      })
      .map(setTags)
    )
);

const postTag = action$ => (
  action$
    .ofType(POST_TAG)
    .switchMap(({ name }) =>
      post({
        fullEndpoint: `${endpoint}api/v1/tag`,
        allocatedApi: true,
        params: { name }
      })
      .map(setTags)
    )
);

const addTagToRepo = action$ => (
  action$
    .ofType(ADD_TAG_REPO)
    .switchMap(({ repoRegistrationId, tagId }) =>
      post({
        fullEndpoint: `${endpoint}api/v1/tag/${tagId}/repo/${repoRegistrationId}`,
        allocatedApi: true
      })
    )
    .flatMap(res =>

    )
);

export default combineEpics(getAllTags, postTag, addTagToRepo);
