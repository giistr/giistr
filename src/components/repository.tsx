import * as React from 'react';
import { Colors } from '../style';
import { Map } from 'immutable';
import * as moment from 'moment';

const styles = {
  mainRepo: {
    margin: '0px 20px',
    backgroundColor: 'white'
  },
  repoContainer: {
    display: 'flex',
    padding: '24px 20px',
    minWidth: 400,
    flexDirection: 'column',
    border: `1px solid ${Colors.borderGrey}`,
    borderRadius: '5px 5px 0px 0px'
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
    margin: '20px 0px',
    fontSize: 15,
    lineHeight: '22px',
    color: Colors.middleGrey
  },
  second: {
    fontSize: 13,
    justifyContent: 'space-between',
    color: Colors.middleGrey,
    fontWeight: 300,
    paddingTop: 16,
    borderTop: `1px solid ${Colors.borderGrey}`
  },
  item: {
    marginLeft: 24
  },
  counter: {
    marginLeft: 8
  },
  starLabel: {
    fontWeight: 400
  },
  first: {
    display: 'flex'
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
            <div style={styles.first}>
              <div>{ repo.get('language') }</div>
              <div style={styles.item}>Issues: { repo.get('open_issues') }</div>
              <div style={styles.item}>Updated: { moment(repo.get('updated_at')).format('DD/MM/YYYY') }</div>
            </div>
            <div>
              <span>Star</span>
              <span style={styles.counter}>{ repo.get('stargazers_count') }</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
