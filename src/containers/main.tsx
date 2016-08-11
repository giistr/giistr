import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { Map } from 'immutable';

const { connect } = ReactRedux;

interface MainProps {};

class Main extends React.Component<MainProps, any> {

  render() {

    return (
      <div>
        <h1>TEST</h1>
      </div>
    );
  }
}

export default Main;