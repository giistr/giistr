import * as React from 'react';

import { connect } from 'react-redux';
import { OrderedMap, Set, List } from 'immutable';
import { getRepos, clear, getAllRepos } from '../actions/repositories';
import { getIssues } from '../actions/issues';
import { Repository } from '../reducers/repository';
import { Issue } from '../reducers/issues';

import ToolBar from '../components/toolbar';
import RepoColumn from '../components/repo-column';

const styles = {
  mainList: {
    display: 'flex',
    margin: '0px auto',
    marginTop: 100
  }
};

declare var process: any;
const env = process.env.NODE_ENV;

interface MainProps {
  clear: any;
  dispatch: any;
  getRepos: any;
  getAllRepos: any;
  getIssues: any;
  repositories: OrderedMap<number, Repository>;
  languages: Set<string>;
  labels: List<string>
};

const initialState = {
  page: 1,
  username: '',
  selected: Set<string>(),
  languageFilter: undefined
};

class Main extends React.Component<MainProps, any> {

  public state = initialState;

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

  private onClickRepository = (id) => {
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
  };

  private onNext(page) {
    if(this.state.username) {
      this.setState({ page });
      this.onGetRepository(page);
    } else {
      console.warn("Please enter a valid username");
    }
  };

  private onGetAll = () => {
    const { getAllRepos, dispatch } = this.props;
    const { username, page } = this.state;

    dispatch(getAllRepos(username, page));
  };

  private selectLanguage = languageFilter => {
    this.setState({ languageFilter });
  };

  private clearList = () => {
    const { dispatch, clear } = this.props;
    dispatch(clear());
    this.setState(initialState);
  };

  public render() {
    let { repositories, languages } = this.props;
    const { selected, page, languageFilter } = this.state;

    if(languageFilter) {
      repositories = repositories.filter(repo => repo.get('language') === languageFilter).toOrderedMap();
    }
    const middle = Math.floor(repositories.size / 2);
    const firstColumn = repositories.take(middle).toOrderedMap();
    const secondColumn = repositories.takeLast(middle).toOrderedMap();

    return (
      <div>
        <ToolBar
          onSelectLanguage={this.selectLanguage}
          onClear={this.clearList}
          onUserQuery={this.onUserQuery}
          onGetRepository={this.onGetRepository.bind(this, page)}
          onNext={this.onNext.bind(this, page + 1)}
          onGetAll={this.onGetAll}
          languages={languages}/>
        <div style={styles.mainList}>
        <RepoColumn
          selected={selected}
          repositories={firstColumn}
          onClickRepository={this.onClickRepository}/>
        <RepoColumn
          selected={selected}
          repositories={secondColumn}
          onClickRepository={this.onClickRepository}/>
        </div>
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
    ),
  languages: Set<string>(
    state
      .get('repository')
      .map(repo => repo.get('language'))
      .toList()
      .filter(Boolean)
  ),
  labels: List<string>(
    state
      .get('issues')
      .map(repo => repo.get('labels'))
      .flatten(1)
      .map(label => label.get('name'))
      .toList()
      .filter(Boolean)
  )
}), dispatch => ({
  getIssues,
  getRepos,
  getAllRepos,
  clear,
  dispatch
}))(Main);
