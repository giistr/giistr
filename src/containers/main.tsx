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
  location?: any;
};

const initialState = {
  page: 1,
  column: window.innerWidth >= 1440 ? 2 : 1
};

class Main extends React.Component<MainProps, any> {

  public state = initialState;

  public componentWillMount() {
    const { user, repositories } = this.props;

    if (!user.size) {
      browserHistory.push('/');
    }

    if (user.size && !repositories.size) {
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
    const { user, filters, totalRepositories, location } = this.props;
    let { repositories } = this.props;
    const { page, column } = this.state;
    console.log('render main');

    return (
      <div>
        <NavigationBar
          user={user}
          location={location}
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
connect((state, props) => {
  const groupedIssues = state.get('issues').groupBy(issue => issue.get('repositoryId'));

  return {
    totalRepositories: state.get('repository').size,
    repositories: state
      .get('repository')
      .map(repo =>
        repo.set('issues',
          groupedIssues
            .get(repo.get('id'), OrderedMap())
            .filter(applyIssueFilters(state.get('filters')))
        )
      )
      .filter(applyRepositoryFilters(state.get('filters'))),
    user: state.get('user'),
    filters: state.get('filters')
  };
}, dispatch => ({
  getRepos,
  dispatch
}))(Main);
