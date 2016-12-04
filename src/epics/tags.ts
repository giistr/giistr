import { combineEpics } from 'redux-observable';
import { get } from '../fetcher';
import { setTags } from '../actions/tags';
import {
  GET_ALL_TAGS
} from '../constants/tags';

const getAllTags = action$ => (
  action$
    .ofType(GET_ALL_TAGS)
    .switchMap(() =>
      get({
        fullEndpoint: 'https://api.giistr.io/api/v1/tags',
        allocatedApi: true
      })
      .map(setTags)
    )
);

export default combineEpics(getAllTags);
