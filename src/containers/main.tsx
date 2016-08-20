import * as React from 'react';
import { connect } from 'react-redux';
import { OrderedMap } from 'immutable';
import { getRepos } from '../actions/repositories';
import { browserHistory } from 'react-router';
import Layout from '../components/layout';

import {
  applyRepositoryFilters,
  applyIssueFilters
} from '../filters';

import { User } from '../reducers/user';

import ToolBar from '../components/toolbar';
import RepoColumn from '../components/repo-column';
import NavigationBar from '../components/navigation-bar';

const styles = {
  mainList: {
    display: 'flex',
    margin: '0px auto',
    alignItems: 'stretch',
    maxWidth: 1800
  }
};

export type Label = Map<string, string>;

interface MainProps {
  dispatch: any;
  getRepos: any;
  totalRepositories: number;
  repositories: OrderedMap<number, any>;
  user: User;
  filters: Map<string, any>;
};

const initialState = {
  page: 1,
  column: window.innerWidth >= 1440 ? 2 : 1
};

class Main extends React.Component<MainProps, any> {

  public state = initialState;

  public componentWillMount() {
    const { user } = this.props;

    if (user.size === 0) {
      browserHistory.push('/');
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
    const { user, filters, totalRepositories } = this.props;
    let { repositories } = this.props;
    const { page, column } = this.state;

    // Hack because moving the filter repository in connect behave weird
    if (filters.get('withIssues')) {
      repositories = repositories.filter(repo => repo.get('issues').size > 0).toOrderedMap();
    }

    return (
      <div>
        <NavigationBar
          user={user}
          total={totalRepositories}
          after={repositories.size}/>
        <div style={styles.mainList}>
          <Layout
            column={column}
            onClickMore={this.onNext.bind(this, page + 1)}
            repositories={repositories}/>
          <ToolBar
            filters={filters}/>
        </div>
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
  dispatch
}))(Main);
