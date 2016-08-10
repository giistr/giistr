import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as Immutable from 'immutable';

import Main from './containers/main';
import Logger from './common/Logger';
// import { reducer, AppState } from './appReducer';
// import Actions from './actions';
import thunk from 'redux-thunk';


var store = (Redux.applyMiddleware(Logger, thunk)(Redux.createStore)); //(reducer, new AppState());

function mapState2Props(state: any) {
    return {
        name: state.name
    };
}

var App = ReactRedux.connect(mapState2Props)(Main);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App />
    </ReactRedux.Provider>,
    document.getElementById('content')
);
