import { OrderedMap, List, Map } from 'immutable';
import { ADD_REGISTERED_REPOS } from '../constants/registered-repositories';

export type RegisteredRepository = Map<string, any>;

const initialState: OrderedMap<string, RegisteredRepository> = OrderedMap<string, RegisteredRepository>();

export interface RegisteredRepositoryAction {
  payload?: List<RegisteredRepository> | RegisteredRepository;
  type: string;
}

export default (state = initialState, action: RegisteredRepositoryAction) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_REGISTERED_REPOS:
      if (List.isList(payload)) {
        const payloadBis = (payload as List<RegisteredRepository>).reduce((acc, next) => {
          return acc.set(next.get('id'), next);
        }, OrderedMap<any, RegisteredRepository>());

        return state.merge(payloadBis);
      }

      return state.set((payload as RegisteredRepository).get('id'), (payload as RegisteredRepository));

    default:
      return state;
  }
};
