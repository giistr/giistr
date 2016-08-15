import * as React from 'react';
import { OrderedMap, Set } from 'immutable';
import { Repository } from '../reducers/repository';
import Issues from '../components/issues';
import { Colors } from '../style';

interface MainProps {
  repositories: OrderedMap<number, Repository>;
  onClickRepository: Function;
  selected: Set<string|number>;
};

const styles = {
  container: {
    flex: 5
  },
  issues: {
    flex: 1
  },
  language: {
    flex: 3
  },
  name: {
    flex: 8
  },
  repoContainer: {
    backgroundColor: Colors.lightGrey,
    border: `1px solid ${Colors.grey}`,
    borderRadius: 5,
    cursor: 'pointer',
    display: 'flex',
    margin: '10px 20px',
    padding: 10,
    minWidth: 400
  }
};

class RepoColumn extends React.Component<MainProps, any> {
  public render() {
    const { repositories, onClickRepository, selected } = this.props;

    return (
      <div style={styles.container}>
        {
          repositories.map((repo, key) => (
            <li
              key={key}>
              <div
                style={styles.repoContainer}
                onClick={onClickRepository.bind(this, repo.get('id'))}>
                <div style={styles.name}>
                  { repo.get('full_name') }
                </div>
                <div style={styles.language}>
                  { repo.get('language') }
                </div>
                <div style={styles.issues}>
                  { repo.get('open_issues') }
                </div>
              </div>
              {
                selected.includes(repo.get('id')) &&
                  <Issues issues={repo.get('issues')}/>
              }
            </li>
          )).toArray()
        }
      </div>
    );
  }
}

export default RepoColumn;
