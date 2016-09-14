import * as React from 'react';
import { connect } from 'react-redux';
import TopLoader from '../components/top-loader';

interface MainProps {
  loading: boolean;
};

class Wrapper extends React.Component<MainProps, any> {

  public render() {
    const { children, loading } = this.props;

    return (
      <div>
        <TopLoader loading={loading}/>
        {
          children
        }
      </div>
    );
  }
}

export default
connect((state, props) => ({
  loading: state.getIn([ 'config', 'loading' ])
}), null)(Wrapper);
