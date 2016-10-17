import * as React from 'react';
import { connect } from 'react-redux';
import { OrderedMap, Map } from 'immutable';
import Issues from '../components/issues';
import { Repository } from '../components/repository';
import { fetchIssues } from '../actions/issues';

interface MainProps {
  repositories: OrderedMap<number, any>;
  fetchIssues: any;
  dispatch: any;
};

const styles = {
  container: {
    flex: 4.5
  },

  listContainer: {
    marginTop: 40
  }
};

class RepoColumn extends React.PureComponent<MainProps, any> {

  private onLoadMoreIssues(repo, page: number) {
    const { fetchIssues, dispatch } = this.props;

    return dispatch(fetchIssues(repo.get('id'), page));
  };

  public render() {
    const { repositories } = this.props;

    return (
      <div style={styles.container}>
        {
          repositories.map((repo, key) => (
            <li
              style={key > 0 && styles.listContainer}
              key={key}>
              <Repository repo={repo}/>
              {
                repo.get('issues', Map<string, any>()).size > 0 && (
                  <Issues
                    onLoadMore={this.onLoadMoreIssues.bind(this, repo)}
                    limit={repo.get('issuesLimit')}
                    issues={repo.get('issues')}/>
                )
              }
            </li>
          )).toArray()
        }
      </div>
    );
  }
}

export default connect((state, props) => props, dispatch => ({
  fetchIssues,
  dispatch
}))(RepoColumn);
