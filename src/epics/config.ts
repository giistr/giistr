import { combineEpics, ofType } from "redux-observable";
import { ERROR } from "../constants/config";
import { stopError } from "../actions/config";
import { delay, take, map } from "rxjs/operators";

const errorHandlingEpics = action$ =>
  action$.pipe(
    ofType(ERROR),
    delay(3000),
    take(1),
    map(stopError)
  );

export default combineEpics(errorHandlingEpics);
