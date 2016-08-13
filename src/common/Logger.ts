import { Store } from 'redux';

const logger = (store: Store<any>) => next => action => {

  if (action.type) {
    console.group(action.type);
    console.info('dispatching', action);
    console.log('prev state', store.getState());
  }

  let result = next(action);

  if (action.type) {
    console.log('next state', store.getState());
    console.groupEnd();
  }

  return result;
};

export default logger;
