import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as Immutable from 'immutable';
import Logger from './common/Logger';
import { reducer, AppState } from './appReducer';
import Actions from './actions';
import thunk from 'redux-thunk';

interface HelloWorldprops {
    name: string;
    dispatch:any;
}

class HelloWorld extends React.Component<HelloWorldprops, any> {
    name:string;

    change = (e) => {
        this.props.dispatch(Actions.changeName(e.target.value));
    };

    render() {

        const { name } = this.props;

        return (
            <div>
                <p>Hello { name }</p>
                <input placeholder="input your name" value={name} onChange={this.change}/>
            </div>
        );
    }
}

var store = (Redux.applyMiddleware(Logger, thunk)(Redux.createStore))(reducer, new AppState());

function mapState2Props(state:AppState) {
    return {
        name: state.name
    };
}

var App = ReactRedux.connect(mapState2Props)(HelloWorld);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App />
    </ReactRedux.Provider>,
    document.getElementById('content')
);
