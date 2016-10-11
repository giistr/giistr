import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderedMap } from 'immutable';
import { fetchRepos, fetchReposAndIssues, fetchTotalReposLength } from '../actions/repositories';
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
  startLoading: any;
  fetchRepos: any;
  fetchReposAndIssues: any;
  fetchTotalReposLength: any;
  totalRepositories: number;
  repositories: OrderedMap<number, any>;
  user: User;
  filters: Map<string, any>;
  location?: any;
};

class Main extends React.Component<MainProps, any> {

  public state = {
    page: 1
  };

  public componentWillMount() {
    const { user, repositories, fetchTotalReposLength } = this.props;

    if (!user.size) {
      browserHistory.push('/');
    }

    if (user.size && !repositories.size) {
      this.onGetRepository(this.state.page);
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
  };

  private onNext(page) {
    this.setState({ page });
    this.onGetRepository(page);
  };

  private onAll = () => {
    const {
      fetchReposAndIssues,
      user
    } = this.props;

    const { page } = this.state;

    fetchReposAndIssues(user.get('login'), page);
  }

  public render() {
    const { user, filters, totalRepositories, location, repositories } = this.props;
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
  fetchRepos: bindActionCreators(fetchRepos, dispatch),
  fetchReposAndIssues: bindActionCreators(fetchReposAndIssues, dispatch),
  fetchTotalReposLength: bindActionCreators(fetchTotalReposLength, dispatch),
  startLoading: bindActionCreators(startLoading, dispatch)
}))(Main);
