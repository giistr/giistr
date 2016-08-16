import * as React from 'react';

import { connect } from 'react-redux';
import { OrderedMap, Set, List } from 'immutable';
import { getRepos, clear, getAllRepos } from '../actions/repositories';
import { getIssues } from '../actions/issues';
import { getUser } from '../actions/user';

import { Repository } from '../reducers/repository';
import { User } from '../reducers/user';

import ToolBar from '../components/toolbar';
import RepoColumn from '../components/repo-column';
import NavigationBar from '../components/navigation-bar';

const styles = {
  mainList: {
    display: 'flex',
    margin: '0px auto',
    alignItems: 'stretch'
  }
};

interface MainProps {
  clear: any;
  dispatch: any;
  getRepos: any;
  getUser: any;
  getAllRepos: any;
  getIssues: any;
  repositories: OrderedMap<number, Repository>;
  languages: Set<string>;
  labels: List<string>;
  user: User;
  params: any;
};

const initialState = {
  languageFilter: undefined,
  page: 1,
};

class Main extends React.Component<MainProps, any> {

  public state = initialState;

  private componentWillMount() {
    const { params, user, getUser, dispatch } = this.props;

    if (user.size === 0) {
      dispatch(getUser(params.userId)).then(user => {
        this.onGetRepository(this.state.page, user);
      });
    } else {
      this.onGetRepository(this.state.page);
    }
  }

  private onGetRepository(page, user: User = this.props.user) {
    const { dispatch, getRepos } = this.props;

    dispatch(getRepos(user.get('login'), page));
  };

  private onNext(page) {
    this.setState({ page });
    this.onGetRepository(page);
  };

  private onGetAll = () => {
    const { getAllRepos, dispatch, user } = this.props;
    const { page } = this.state;

    dispatch(getAllRepos(user.get('login'), page));
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
    const { repositories, languages } = this.props;
    const { page, languageFilter } = this.state;
    let filteredRepos = repositories;

    if (languageFilter) {
      filteredRepos = repositories.filter(repo => repo.get('language') === languageFilter).toOrderedMap();
    }
    const middle = Math.floor(filteredRepos.size / 2);
    const firstColumn = filteredRepos.take(middle).toOrderedMap();
    const secondColumn = filteredRepos.takeLast(middle).toOrderedMap();

    return (
      <div>
        <NavigationBar
          total={repositories.size}
          after={filteredRepos.size}/>
        <div style={styles.mainList}>
          <RepoColumn
            repositories={firstColumn}/>
          <RepoColumn
            repositories={secondColumn}/>
          <ToolBar
            onSelectLanguage={this.selectLanguage}
            onClear={this.clearList}
            onNext={this.onNext.bind(this, page + 1)}
            onGetAll={this.onGetAll}
            languages={languages}/>
        </div>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  labels: List<string>(
    state
      .get('issues')
      .map(repo => repo.get('labels'))
      .flatten(1)
      .map(label => label.get('name'))
      .toList()
      .filter(Boolean)
  ),
  languages: Set<string>(
    state
      .get('repository')
      .map(repo => repo.get('language'))
      .toList()
      .filter(Boolean)
  ),
  repositories: state
    .get('repository')
    .map(repo =>
      repo.set('issues', state.get('issues').filter(issue => issue.get('repoId') === repo.get('id')))
    ),
  user: state.get('user')
}), dispatch => ({
  getIssues,
  getRepos,
  getUser,
  getAllRepos,
  clear,
  dispatch
}))(Main);
