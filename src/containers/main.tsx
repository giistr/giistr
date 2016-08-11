import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as Immutable from 'immutable';

const { Map } = Immutable;
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