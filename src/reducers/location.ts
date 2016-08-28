import { LOCATION_CHANGE } from 'react-router-redux';
import { fromJS } from 'immutable';

const initialState = fromJS({
  locationBeforeTransitions: null
});

export default (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: payload
      });
    default:
      return state;
  }
};
