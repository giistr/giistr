import * as React from 'react';
import { getUser } from '../actions/user';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { browserHistory } from 'react-router';

interface MainProps {
  dispatch: any;
  getUser: any;
  user: Map<string, string | number>;
};

const styles = {};

class Landing extends React.Component<MainProps, any> {

  public state = {
    username: '',
    userTimeout: true
  };

  public componentWillReceiveProps(nextProps) {
    if (!nextProps.user.get('isWrong', false)) {
      const { user } = nextProps;

      browserHistory.push(`app/${user.get('login')}`);
    }
  }

  private onUserQuery = evt => {
    this.setState({
      username: evt.target.value
    });
  };

  private onSearch = () => {
    const { username } = this.state;
    const { dispatch, getUser } = this.props;

    dispatch(getUser(username));

    setTimeout(() => {
      this.setState({
        userTimeout: false
      });
    }, 3000);
  };

  public render() {
    const { user } = this.props;
    const { userTimeout } = this.state;

    return (
      <div>
        <input type="text" placeholder="Enter github user account" onChange={this.onUserQuery}/>
        <button onClick={this.onSearch}>Search</button>
        {
          user.get('isWrong') && userTimeout && (
            <div>
              <h1>Wrong user</h1>
            </div>
          )
        }
      </div>
    );
  }
}

export default connect(state => ({ user: state.get('user') }),
dispatch => ({
  dispatch,
  getUser
}))(Landing);
