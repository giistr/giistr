import * as React from 'react';
import { Colors } from '../style';
import { Map } from 'immutable';
import * as moment from 'moment';

const styles = {
  mainRepo: {
    margin: '0px 20px'
  },
  repoContainer: {
    display: 'flex',
    padding: '20px 10px',
    minWidth: 400,
    flexDirection: 'column'
  },
  line: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between'
  },
  name: {
    backgroundColor: Colors.blueBackground,
    padding: '0px 6px',
    borderRadius: 4
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
  },
  starLabel: {
    fontWeight: 500
  }
};

export function Repository({ repo }: { repo: Map<string, any> }) {

  return (
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
          <div>{ repo.get('language') }</div>
          <div style={styles.issues}>Issues: { repo.get('open_issues') }</div>
          <div style={styles.updated}>Updated: { moment(repo.get('updated_at')).format('MMMM Do YYYY') }</div>
          <div style={styles.starContainer}>
            <span style={styles.starLabel}>Star</span>
            <span style={styles.counter}>{ repo.get('stargazers_count') }</span>
          </div>
        </div>
      </div>
    </div>
  );
}
