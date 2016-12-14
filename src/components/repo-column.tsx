import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { OrderedMap, Map } from 'immutable';
import Issues from '../components/issues';
import { Repository } from '../components/repository';
import { fetchIssues } from '../actions/issues';
import { addTagToRepo } from '../actions/tags';
import { Tag } from '../reducers/tags';

interface MainProps {
  repositories: OrderedMap<number, any>;
  fetchIssues: any;
  addTagToRepo: any;
  tags: Map<string, Tag>
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
    const { fetchIssues } = this.props;

    return fetchIssues(repo.get('id'), page);
  };

  public render() {
    const { repositories, tags, addTagToRepo } = this.props;

    return (
      <div style={styles.container}>
        {
          repositories.map((repo, key) => (
            <li
              style={key > 0 && styles.listContainer}
              key={key}>
              <Repository repo={repo} tags={tags} addTagToRepo={addTagToRepo}/>
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

export default connect((state, props) => ({
  tags: state.get('tag')
}), dispatch => ({
  addTagToRepo: bindActionCreators(addTagToRepo, dispatch),
  fetchIssues: bindActionCreators(fetchIssues, dispatch)
}))(RepoColumn);
