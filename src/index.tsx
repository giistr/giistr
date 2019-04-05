import 'rxjs';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import store, { history } from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as ReactGA from 'react-ga';

import Main from './containers/main';
import Landing from './containers/landing';
import About from './containers/about';
import Wrapper from './containers/wrapper';
import './common.css';

ReactGA.initialize('UA-42294228-2');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Wrapper>
              <Landing />
            </Wrapper>
          )}
        />
        <Route
          path="/home"
          component={(props: any) => (
            <Wrapper>
              <Main location={props.location} />
            </Wrapper>
          )}
        />
        <Route
          path="/about"
          component={props => (
            <Wrapper>
              <About location={props.location} />
            </Wrapper>
          )}
        />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
