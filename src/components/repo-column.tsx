import * as React from 'react';
import { OrderedMap, Set, Map } from 'immutable';
import { Repository } from '../reducers/repository';
import Issues from '../components/issues';
import { Colors } from '../style';

interface MainProps {
  repositories: OrderedMap<number, Repository>;
};

const styles = {
  container: {
    flex: 5,
    marginTop: 40
  },
  repoContainer: {
    cursor: 'pointer',
    display: 'flex',
    margin: '10px 0px',
    padding: 10,
    minWidth: 400,
    flexDirection: 'column',
    borderBottom: `1px solid ${Colors.borderGrey}`
  },
  mainRepo: {
    margin: '0px 20px',
    border: `1px solid ${Colors.borderGrey}`
  },
  line: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between'
  },
  description: {
    padding: '20px 10px',
    lineHeight: '22px',
  },
  second: {
    fontSize: 14,
    marginTop: 12
  },
  name: {

  },
  language: {

  },
  issues: {

  },
  updated: {

  }
};

class RepoColumn extends React.Component<MainProps, any> {
  public render() {
    const { repositories } = this.props;

    return (
      <div style={styles.container}>
        {
          repositories.map((repo, key) => (
            <li
              key={key}>
              <div style={styles.mainRepo}>
                <div
                  style={styles.repoContainer}>
                  <div style={styles.line}>
                    <div style={styles.name}>{ repo.get('full_name') }</div>
                    <div>Star { repo.get('stargazers_count') }</div>
                  </div>
                  <div style={Object.assign({}, styles.line, styles.second)}>
                    <div style={styles.language}>{ repo.get('language') }</div>
                    <div style={styles.issues}>Issues: { repo.get('open_issues') }</div>
                    <div style={styles.updated}>updated: { repo.get('updated_at') }</div>
                  </div>
                </div>
                <div style={styles.description}>
                  { repo.get('description') }
                </div>
              </div>
              {
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
