import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import { combineEpics } from 'redux-observable';
import { ERROR } from '../constants/config';
import { stopError } from '../actions/config';

const errorHandlingEpics = action$ =>
  action$
    .ofType(ERROR)
    .delay(3000)
    .take(1)
    .map(stopError);

export default combineEpics(errorHandlingEpics);
