import "rxjs/add/operator/map";

import { get, post } from "../fetcher";
import { combineEpics, ofType } from "redux-observable";
import { FETCH_USER, OAUTH_USER, FETCH_GITHUB_TOKEN } from "../constants/user";
import { oauthUser, addUser } from "../actions/user";
import { mergeMap, map, concatMap } from "rxjs/operators";

const fetchTokenEpic = action$ =>
  action$.pipe(
    ofType(FETCH_GITHUB_TOKEN),
    mergeMap(({ code }) =>
      post({
        fullEndpoint: "/api/github-login",
        preventBody: true,
        params: { code }
      })
    ),
    map((res: any) => oauthUser(res.get("access_token")))
  );

const oauthUserEpic = action$ =>
  action$.pipe(
    ofType(OAUTH_USER),
    concatMap(({ token }) =>
      get({
        endpoint: "user",
        params: { access_token: token }
      }).pipe(map(user => addUser(user.set("access_token", token))))
    )
  );

const fetchUserEpic = action$ =>
  action$.pipe(
    ofType(FETCH_USER),
    mergeMap(({ username }) => get({ endpoint: `users/${username}` })),
    map(addUser)
  );

export default combineEpics(fetchTokenEpic, oauthUserEpic, fetchUserEpic);
