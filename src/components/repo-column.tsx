import * as React from 'react';
import { OrderedMap } from 'immutable';
import Issues from '../components/issues';
import { Repository } from '../components/repository';

interface MainProps {
  repositories: OrderedMap<number, any>;
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
                  <Issues issues={repo.get('issues')}/>
                )
              }
            </li>
          )).toArray()
        }
      </div>
    );
  }
}

export default RepoColumn;
