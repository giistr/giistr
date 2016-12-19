import * as React from 'react';
import { connect } from 'react-redux';
import TopLoader from '../components/top-loader';
import NotificationManager from '../components/notification-manager';
import { bindActionCreators } from 'redux';
import { getAllTags } from '../actions/tags';

interface MainProps {
  loading: boolean;
  getAllTags: any;
};

class Wrapper extends React.Component<MainProps, any> {

  public componentWillMount() {
    this.props.getAllTags();
  }

  public render() {
    const { children, loading } = this.props;

    return (
      <div>
        <TopLoader loading={loading}/>
        <NotificationManager/>
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
}), (dispatch) => ({
  getAllTags: bindActionCreators(getAllTags, dispatch)
}))(Wrapper);
