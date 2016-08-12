import * as React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { getRepos } from '../actions/actions';

interface MainProps {
  fetchRepos: any
};

class Main extends React.Component<MainProps, any> {

  render() {

    console.log(this.props.fetchRepos);

    return (
      <div>
        <h1>TEST</h1>
      </div>
    );
  }
}

export default connect((state) => state, (dispatch) => {
  fetchRepos: () => dispatch(getRepos)
})(Main);