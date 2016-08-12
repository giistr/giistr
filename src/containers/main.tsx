import { connect } from 'react-redux';
import { OrderedMap } from 'immutable';
import { getRepos } from '../actions/actions';
import { Repository } from '../reducers/repository';

interface MainProps {
  fetchRepos: any;
  dispatch: any;
  getRepos: any;
  repositories: OrderedMap<number, Repository>;
};

class Main extends React.Component<MainProps, any> {

  state = {
    username: ""
  };

  _onGetRepository = () => {
    const { username } = this.state;
    const { dispatch, getRepos } = this.props;

    dispatch(getRepos(username));
  };

  _onUserQuery = evt => {
    this.setState({
      username: evt.target.value
    });
  };

  public render() {
    const { repositories } = this.props;

    return (
      <div>
        <input type="text" placeholder="Enter github user account" onChange={this._onUserQuery}/>
        <button onClick={this._onGetRepository}>Search</button>
        <ul>
          {
            repositories.map(repo => (
              <li>
                { repo.get('full_name') }
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  repositories: state.get('repository')
}), dispatch => ({
  getRepos,
  dispatch
}))(Main);
