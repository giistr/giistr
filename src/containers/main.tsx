import * as React from 'react';
import { connect } from 'react-redux';
import { OrderedMap } from 'immutable';
import { getRepos, fetchReposAndIssues, fetchTotalReposLength } from '../actions/repositories';
import { browserHistory } from 'react-router';
import Layout from '../components/layout';
import { Colors } from '../style';
import { startLoading, stopLoading } from '../actions/config';

import {
  applyRepositoryFilters,
  applyIssueFilters
} from '../filters';

import { User } from '../reducers/user';

import ToolBar from '../components/toolbar';
import NavigationBar from '../components/navigation-bar';

const styles = {
  container: {
    backgroundColor: Colors.greyish,
    minHeight: '100vh'
  },
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
  fetchReposAndIssues: any;
  fetchTotalReposLength: any;
  totalRepositories: number;
  repositories: OrderedMap<number, any>;
  user: User;
  filters: Map<string, any>;
  location?: any;
  startLoading: any;
  stopLoading: any;
};

class Main extends React.Component<MainProps, any> {

  public state = {
    page: 1
  };

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
    const {
      dispatch,
      getRepos,
      fetchTotalReposLength,
      startLoading,
      stopLoading
    } = this.props;

    startLoading()(dispatch);

    getRepos(user.get('login'), page)(dispatch).then(() => {
      stopLoading()(dispatch);
    });

    // Fetch the total number of starred repositories by a user
    fetchTotalReposLength(user.get('login'))(dispatch);
  };

  private onNext(page) {
    this.setState({ page });
    this.onGetRepository(page);
  };

  private onAll = () => {
    const {
      dispatch,
      fetchReposAndIssues,
      user,
      startLoading,
      stopLoading
    } = this.props;

    const { page } = this.state;

    startLoading()(dispatch);

    fetchReposAndIssues(user.get('login'), page)(dispatch)
      .then(() => {
        stopLoading()(dispatch);
      });
  }

  public render() {
    const { user, filters, totalRepositories, location } = this.props;
    let { repositories } = this.props;
    const { page } = this.state;

    return (
      <div style={styles.container}>
        <NavigationBar
          user={user}
          location={location}
          total={totalRepositories}
          after={repositories.size}/>
        <div style={styles.mainList}>
          <Layout
            hasNext={30 * page === totalRepositories}
            onClickAll={this.onAll}
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
  fetchReposAndIssues,
  fetchTotalReposLength,
  dispatch,
  startLoading,
  stopLoading
}))(Main);
