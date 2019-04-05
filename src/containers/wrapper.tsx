import * as React from 'react';
import { connect } from 'react-redux';
import TopLoader from '../components/top-loader';
import NotificationManager from '../components/notification-manager';

interface MainProps {
  loading: boolean;
}

class Wrapper extends React.Component<MainProps, any> {
  public render() {
    const { children, loading } = this.props;

    return (
      <div>
        <TopLoader loading={loading} />
        <NotificationManager />
        {children}
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    loading: state.config.get('loading')
  }),
  null
)(Wrapper);
