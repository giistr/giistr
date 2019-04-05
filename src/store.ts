import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootEpics from './epics';
import rootReducer from './reducers';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

const store = createStore(
  rootReducer(history),
  applyMiddleware(epicMiddleware, routerMiddleware(history))
);

epicMiddleware.run(rootEpics as any);

export default store;
