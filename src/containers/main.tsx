import * as React from 'react';

import { connect } from 'react-redux';
import { OrderedMap, Set, List } from 'immutable';
import { getRepos, clear, getAllRepos } from '../actions/repositories';
import { getUser } from '../actions/user';
import {
  applyRepositoryFilters,
  applyIssueFilters
} from '../filters';

import { Repository } from '../reducers/repository';
import { User } from '../reducers/user';

import ToolBar from '../components/toolbar';
import RepoColumn from '../components/repo-column';
import NavigationBar from '../components/navigation-bar';

const styles = {
  mainList: {
    display: 'flex',
    margin: '0px auto',
    alignItems: 'stretch',
    maxWidth: 1700
  }
};

export type Label = Map<string, string>;

interface MainProps {
  dispatch: any;
  getRepos: any;
  getUser: any;
  totalRepositories: number;
  repositories: OrderedMap<number, Repository>;
  user: User;
  params: any;
  filters: Map<string, any>
};

const initialState = {
  page: 1
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

  public render() {
    const { repositories, user, filters, totalRepositories } = this.props;
    const { page } = this.state;

    const middle = Math.floor(repositories.size / 2);
    const firstColumn = repositories.take(middle).toOrderedMap();
    const secondColumn = repositories.takeLast(middle).toOrderedMap();

    return (
      <div>
        <NavigationBar
          total={totalRepositories}
          after={repositories.size}/>
        <div style={styles.mainList}>
          <RepoColumn
            repositories={firstColumn}/>
          <RepoColumn
            repositories={secondColumn}/>
          <ToolBar
            user={user}
            filters={filters}/>
        </div>
        <button onClick={this.onNext.bind(this, page + 1)}>More</button>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  totalRepositories: state.get('repository').size,
  repositories: state
    .get('repository')
    .filter(applyRepositoryFilters(state.get('filters')))
    .map(repo =>
      repo.set('issues',
        state
          .get('issues')
          .filter(applyIssueFilters(state.get('filters')))
          .filter(issue => issue.get('repositoryId') === repo.get('id'))
      )
    ),
  user: state.get('user'),
  filters: state.get('filters')
}), dispatch => ({
  getRepos,
  getUser,
  dispatch
}))(Main);
