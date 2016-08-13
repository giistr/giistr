import * as React from 'react';

import { connect } from 'react-redux';
import { OrderedMap, Set } from 'immutable';
import { getRepos, clear } from '../actions/repositories';
import { getIssues } from '../actions/issues';
import { Repository } from '../reducers/repository';
import { Issue } from '../reducers/issues';

import { Colors } from '../style';
import ToolBar from '../components/toolbar';
import Issues from '../components/issues';

const styles = {
  mainList: {
    maxWidth: 600,
    margin: '0px auto'
  },
  repoContainer: {
    padding: 10,
    margin: '10px auto',
    border: `1px solid ${Colors.grey}`,
    borderRadius: 5,
    backgroundColor: Colors.lightGrey,
    cursor: 'pointer'
  }
};

declare var process: any;
const env = process.env.NODE_ENV;

interface MainProps {
  clear: any;
  dispatch: any;
  getRepos: any;
  getIssues: any;
  repositories: OrderedMap<number, Repository>;
};

class Main extends React.Component<MainProps, any> {

  public state = {
    page: 1,
    username: '',
    selected: env === 'dev' ? Set([ '29943859' ]) : Set()
  };

  private onGetRepository(page) {
    const { username } = this.state;
    const { dispatch, getRepos } = this.props;

    dispatch(getRepos(username, page));
  };

  private onUserQuery = evt => {
    this.setState({
      username: evt.target.value
    });
  };

  private onClickRepository(id) {
    const { selected } = this.state;
    const { dispatch, getIssues, repositories } = this.props;
    const repo = repositories.get(id);

    if(repo.get('open_issues') > 0 && !selected.includes(id)) {
      dispatch(getIssues(repo.get('full_name'), id));
    }

    if(selected.includes(id)) {
      this.setState({
        selected: selected.remove(id)
      });
    } else {
      this.setState({
        selected: selected.add(id)
      });
    }
  }

  private onNext(page) {
    if(this.state.username) {
      this.setState({ page });
      this.onGetRepository(page);
    } else {
      console.warn("Please enter a valid username");
    }
  };

  private clearList = () => {
    const { dispatch, clear } = this.props;
    dispatch(clear());
  };

  public render() {
    const { repositories } = this.props;
    const { selected, page } = this.state;

    return (
      <div>
        <ToolBar
          onClear={this.clearList}
          onUserQuery={this.onUserQuery}
          onGetRepository={this.onGetRepository.bind(this, page)}
          onNext={this.onNext.bind(this, page + 1)}/>
        <ul style={styles.mainList}>
          {
            repositories.map((repo, key) => (
              <li
                key={key}>
                <div
                  style={styles.repoContainer}
                  onClick={this.onClickRepository.bind(this, repo.get('id'))}>
                  {
                    repo.get('full_name')
                  }
                </div>
                {
                  selected
                    .includes(repo.get('id')) &&
                    <Issues issues={repo.get('issues')}/>
                }
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
  repositories: state
    .get('repository')
    .map(repo =>
      repo.set('issues', state.get('issues').filter(issue => issue.get('repoId') === repo.get('id')))
    )
}), dispatch => ({
  getIssues,
  getRepos,
  clear,
  dispatch
}))(Main);
