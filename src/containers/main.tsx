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
    username: '',
    selected: env === 'dev' ? Set([ '29943859' ]) : Set()
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

  private clearList = () => {
    const { dispatch, clear } = this.props;
    dispatch(clear());
  };

  public render() {
    const { repositories } = this.props;
    const { selected } = this.state;

    return (
      <div>
        <ToolBar
          onClear={this.clearList}
          onUserQuery={this.onUserQuery}
          onGetRepository={this.onGetRepository}/>
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
