import * as React from 'react';
import { connect } from 'react-redux';

import { OrderedMap } from 'immutable';
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

  private onLoadMoreIssues(repo, page) {
    const { fetchIssues, dispatch } = this.props;

    dispatch(fetchIssues(repo.get('full_name'), repo.get('id'), page));
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
                repo.get('issues').size > 0 && (
                  <Issues
                    onLoadMore={this.onLoadMoreIssues.bind(this, repo)}
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
