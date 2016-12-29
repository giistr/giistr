import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { OrderedMap, Map } from 'immutable';
import Issues from '../components/issues';
import { Repository } from '../components/repository';
import { fetchIssues } from '../actions/issues';
import { addTagToRepo } from '../actions/tags';
import { createRepoAddTag } from '../actions/registered-repositories';
import { Tag } from '../reducers/tags';

interface MainProps {
  repositories: OrderedMap<number, any>;
  fetchIssues: any;
  addTagToRepo: any;
  createRepoAddTag: any;
  tags: Map<string, Tag>;
  registeredRepos: any;
};

const styles = {
  container: {
    flex: 4.5
  },

  listContainer: {
    marginTop: 40
  }
};

class RepoColumn extends React.Component<MainProps, any> {

  private onLoadMoreIssues(repo, page: number) {
    const { fetchIssues } = this.props;

    return fetchIssues(repo.get('id'), page);
  };

  public render() {
    const { repositories, tags, addTagToRepo, registeredRepos, createRepoAddTag } = this.props;

    return (
      <div style={styles.container}>
        {
          repositories.map((repo, key) => (
            <li
              style={key > 0 && styles.listContainer}
              key={key}>
              <Repository
                repo={repo}
                createRepoAddTag={createRepoAddTag}
                registeredRepo={registeredRepos.find(rr => rr.get('github_repo_id') === repo.get('id'))}
                tags={tags}
                addTagToRepo={addTagToRepo}/>
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

export default connect<any, any, any>((state, { repositories }) => ({
  registeredRepos: state
    .get('registeredRepositories')
    .filter(rr => repositories.get(rr.get('github_repo_id'))),
  tags: state.get('tag')
}), dispatch => ({
  addTagToRepo: bindActionCreators(addTagToRepo, dispatch),
  createRepoAddTag: bindActionCreators(createRepoAddTag, dispatch),
  fetchIssues: bindActionCreators(fetchIssues, dispatch)
}))(RepoColumn);
