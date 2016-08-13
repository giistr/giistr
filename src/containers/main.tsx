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

  public state = {
    username: ''
  };

  private onGetRepository = () => {
    const { username } = this.state;
    const { dispatch, getRepos } = this.props;

    dispatch(getRepos(username));
  };

  private onUserQuery = evt => {
    this.setState({
      username: evt.target.value
    });
  };

  private onClickRepository(id) {
    const { dispatch, getIssues, repositories } = this.props;
    const repo = repositories.get(id);

    dispatch(getIssues(repo.get('full_name'), id));
  }

  public render() {
    const { repositories } = this.props;

    return (
      <div>
        <input type="text" placeholder="Enter github user account" onChange={this.onUserQuery}/>
        <button onClick={this.onGetRepository}>Search</button>
        <ul>
          {
            repositories.map((repo, key) => (
              <li key={key} onClick={this.onClickRepository.bind(this, repo.get('id'))}>
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
