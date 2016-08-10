import * as Redux from 'redux';
import * as Immutable from 'immutable';
import Actions from './actions';

var StateRecord = Immutable.Record({
    name: ''
});

export class AppState extends StateRecord {
    name: string;
}

export var reducer:Redux.Reducer = (state:AppState, action:any) => {
    switch( action.type ) {
        case Actions.CHANGE_NAME:
            return state.set('name', action.name);
        default:
            return state;
    }
};