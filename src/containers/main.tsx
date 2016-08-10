import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as Immutable from 'immutable';

const { Map } = Immutable;
const { connect } = ReactRedux;

interface MainProps {
  name: string;
  dispatch: any;
}

@connect(function(state: Map) {

})
class Main extends React.Component<MainProps, any> {

  render() {
    const { name } = this.props;

    return (
      <div>
      </div>
    );
  }
}

export default Main;