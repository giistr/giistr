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
  fullName: {
    display: 'flex',
    color: Colors.grey,
    letterSpacing: 1.5
  },
  slash: {
    color: Colors.blue
  },
  name: {
    backgroundColor: Colors.blueBackground,
    padding: '0px 6px',
    borderRadius: 2
  },
  font: {
    fontWeight: 400
  },
  description: {
    marginBottom: 30,
    marginTop: 20,
    fontSize: 15,
    lineHeight: '22px',
    color: Colors.middleGrey
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
    fontWeight: 400
  }
};

export class Repository extends React.PureComponent<{ repo: Map<string, any> }, any> {

  public shouldComponentUpdate(nextProps) {
    return !nextProps.repo.equals(this.props.repo);
  }

  public render() {
    const { repo } = this.props;

    return (
      <div style={styles.mainRepo}>
        <div
          style={styles.repoContainer}>
          <div style={styles.line}>
            <div style={styles.fullName}>
              <h1 style={styles.font}>{repo.getIn([ 'owner', 'login' ])}</h1>
              <a href={repo.get('html_url')} target="_blank">
                <h1 style={styles.name}>
                  <span style={styles.slash}>/</span><span style={styles.font}>{ repo.get('name') }</span>
                </h1>
              </a>
            </div>
          </div>
          <div style={styles.description}>
            { repo.get('description') }
          </div>
          <div style={Object.assign({}, styles.line, styles.second)}>
            <div>{ repo.get('language') }</div>
            <div style={styles.issues}>Issues: { repo.get('open_issues') }</div>
            <div style={styles.updated}>Updated: { moment(repo.get('updated_at')).format('DD/MM/YYYY') }</div>
            <div style={styles.starContainer}>
              <span style={styles.starLabel}>Star</span>
              <span style={styles.counter}>{ repo.get('stargazers_count') }</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
