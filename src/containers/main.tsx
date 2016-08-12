import { connect } from 'react-redux';
import { OrderedMap } from 'immutable';
import { getRepos } from '../actions/repositories';
import { getIssues } from '../actions/issues';

import { Repository } from '../reducers/repository';

interface MainProps {
  fetchRepos: any;
  dispatch: any;
  getRepos: any;
  getIssues: any;
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

  _onClickRepository(id) {
    const { dispatch, getIssues, repositories } = this.props;
    const repo = repositories.get(id);

    dispatch(getIssues(repo.get('full_name'), id));
  }

  public render() {
    const { repositories } = this.props;

    return (
      <div>
        <input type="text" placeholder="Enter github user account" onChange={this._onUserQuery}/>
        <button onClick={this._onGetRepository}>Search</button>
        <ul>
          {
            repositories.map(repo => (
              <li onClick={this._onClickRepository.bind(this, repo.get('id'))}>
                { repo.get('full_name') }
              </li>
            )).toArray()
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
  getIssues,
  getRepos,
  dispatch
}))(Main);
