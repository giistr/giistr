import * as React from 'react';
import { OrderedMap } from 'immutable';
import Issues from '../components/issues';
import { Colors } from '../style';
import * as moment from 'moment';

interface MainProps {
  repositories: OrderedMap<number, any>;
};

const styles = {
  container: {
    flex: 4.5
  },
  repoContainer: {
    display: 'flex',
    padding: '20px 10px',
    minWidth: 400,
    flexDirection: 'column'
  },
  listContainer: {
    marginTop: 40
  },
  mainRepo: {
    margin: '0px 20px'
  },
  line: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between'
  },
  description: {
    marginBottom: 30,
    marginTop: 20,
    fontSize: 16,
    lineHeight: '22px',
    color: Colors.grey
  },
  second: {
    fontSize: 14,
    justifyContent: 'flex-start',
    fontWeight: 300,
    paddingTop: 16,
    borderTop: `1px solid ${Colors.borderGrey}`
  },
  name: {
    backgroundColor: Colors.blueBackground,
    padding: '0px 6px',
    borderRadius: 4
  },
  language: {},
  issues: {
    marginLeft: 20
  },
  updated: {
    marginLeft: 20
  },
  starContainer: {
    fontSize: 14,
    color: Colors.grey,
    marginLeft: 20
  },
  counter: {
    color: Colors.lightGrey,
    marginLeft: 8
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
              style={key > 0 && styles.listContainer}
              key={key}>
              <div style={styles.mainRepo}>
                <div
                  style={styles.repoContainer}>
                  <div style={styles.line}>
                    <div style={{
                      display: 'flex',
                      color: Colors.grey
                    }}>
                      <h1>{repo.getIn([ 'owner', 'login' ])}</h1>
                      <a href={repo.get('html_url')} target="_blank">
                        <h1 style={styles.name}>/{ repo.get('name') }</h1>
                      </a>
                    </div>
                  </div>
                  <div style={styles.description}>
                    { repo.get('description') }
                  </div>
                  <div style={Object.assign({}, styles.line, styles.second)}>
                    <div style={styles.language}>{ repo.get('language') }</div>
                    <div style={styles.issues}>Issues: { repo.get('open_issues') }</div>
                    <div style={styles.updated}>Updated: { moment(repo.get('updated_at')).format('MMMM Do YYYY') }</div>
                    <div style={styles.starContainer}>
                      <span>Star</span>
                      <span style={styles.counter}>{ repo.get('stargazers_count') }</span>
                    </div>
                  </div>
                </div>
              </div>
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
