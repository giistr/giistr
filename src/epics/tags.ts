import { combineEpics } from 'redux-observable';
import { get, post } from '../fetcher';
import { setTags } from '../actions/tags';
import { Observable } from 'rxjs/Observable';
import { associateTagToRepo } from '../actions/registered-repositories';
import {
  GET_ALL_TAGS,
  POST_TAG,
  ADD_TAG_REPO,
  GET_TAGS_REPO
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
    .flatMap(res => {
      const { repo_id, tag_id } = res.get('assoc').toObject();
      return Observable.of(associateTagToRepo(repo_id, tag_id));
    })
);

const getTagsforRepo = action$ => (
  action$
    .ofType(GET_TAGS_REPO)
    .flatMap(({ registeredRepos }) => {
      // TODO: handle response of this request
      return Observable.forkJoin(
        ...registeredRepos.map(rr =>
          get({
            fullEndpoint: `${endpoint}api/v1/tags/repo/${rr.get('id')}`,
            allocatedApi: true
          })
        ).toArray()
      );
    })
);

export default combineEpics(getAllTags, postTag, addTagToRepo, getTagsforRepo);
