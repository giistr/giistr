import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderedMap } from 'immutable';
import { fetchRepos, fetchAllRepos, fetchTotalReposLength } from '../actions/repositories';
import { browserHistory } from 'react-router';
import Layout from '../components/layout';
import { Colors } from '../style';
import { startLoading } from '../actions/config';

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
  location?: any;
};

interface StateProps {
  totalRepositories: number;
  repositories: OrderedMap<number, any>;
  user: User;
  filters: Map<string, any>;
  page: number;
  limit: boolean;
};

interface DispatchProps {
  startLoading: any;
  fetchRepos: any;
  fetchAllRepos: any;
  fetchTotalReposLength: any;
};

type ClassProps = MainProps & StateProps & DispatchProps;

class Main extends React.Component<ClassProps, any> {

  public componentWillMount() {
    const { user, repositories, fetchTotalReposLength, page } = this.props;

    if (!user.size) {
      browserHistory.push('/');
    }

    if (user.size && !repositories.size) {
      this.onGetRepository(page);
      fetchTotalReposLength(this.props.user.get('login'));
    }
  }

  private onGetRepository(page, user: User = this.props.user) {
    const {
      fetchRepos,
      startLoading
    } = this.props;

    startLoading();
    fetchRepos(user.get('login'), page);
  }

  private onNext = () => {
    const { page } = this.props;
    this.onGetRepository(page + 1);
  };

  private onAll = () => {
    const {
      fetchAllRepos,
      user,
      startLoading,
      page
    } = this.props;

    startLoading();
    fetchAllRepos(user.get('login'), page);
  }

  public render() {
    const {
      user,
      filters,
      totalRepositories,
      location,
      repositories,
      limit
    } = this.props;

    return (
      <div style={styles.container}>
        <NavigationBar
          user={user}
          location={location}
          total={totalRepositories}
          after={repositories.size}/>
        <div style={styles.mainList}>
          <Layout
            hasNext={!limit}
            onClickAll={this.onAll}
            onClickMore={this.onNext}
            repositories={repositories}/>
          <ToolBar
            filters={filters}/>
        </div>
      </div>
    );
  }
}

export default
connect<StateProps, DispatchProps, any>((state, props) => {
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
    filters: state.get('filters'),
    page: state.getIn(['config', 'page']),
    limit: state.getIn(['config', 'limit'])
  };
}, dispatch => ({
  fetchRepos: bindActionCreators(fetchRepos, dispatch),
  fetchAllRepos: bindActionCreators(fetchAllRepos, dispatch),
  fetchTotalReposLength: bindActionCreators(fetchTotalReposLength, dispatch),
  startLoading: bindActionCreators(startLoading, dispatch)
}))(Main);
