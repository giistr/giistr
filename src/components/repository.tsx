import * as React from 'react';
import { Colors } from '../style';
import { Map } from 'immutable';
import * as moment from 'moment';

const borderSwitch = [
  `1px solid ${Colors.borderGrey}`,
  `1px solid ${Colors.blueDarkBorder}`
];

const styles = {
  mainRepo: {
    margin: '0px 20px',
    backgroundColor: 'white'
  },
  repoContainer: {
    display: 'flex',
    padding: '0px 20px',
    paddingTop: 27,
    paddingBottom: 16,
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
    marginTop: 13,
    marginBottom: 15,
    fontSize: 14,
    lineHeight: '22px',
    color: Colors.middleGrey
  },
  second: {
    fontSize: 13,
    color: Colors.middleLightGrey,
    fontWeight: 400,
    paddingTop: 16,
    transition: 'border 1s ease'
  },
  subline: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between'
  },
  item: {
    marginLeft: 24
  },
  counter: {
    marginLeft: 4
  },
  starLabel: {
    fontWeight: 400
  },
  first: {
    display: 'flex'
  }
};

export class Repository extends React.PureComponent<{ repo: Map<string, any>; }, { borderIndex: number; }> {

  private interval = undefined;

  public state = {
    borderIndex: 1
  };

  public componentWillMount() {
    const { repo } = this.props;

    if (repo.size === 0) {
      this.interval = setInterval(this.onUpdateBorder.bind(this, repo), 1500);
    }
  }

  public componentWillUnmount() {
    clearInterval(this.interval);
  }

  public shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.repo.equals(this.props.repo) || nextState.borderIndex !== this.state.borderIndex;
  }

  private onUpdateBorder(repo) {
    if (repo.size === 0) {
      this.setState({
        borderIndex: this.state.borderIndex === 0 ? 1 : 0
      });
    } else {
      clearInterval(this.interval);
    }
  }

  public render() {
    const { repo } = this.props;
    const { borderIndex } = this.state;

    const border = {
      borderTop: repo.size === 0 ? borderSwitch[borderIndex] : borderSwitch[0]
    };

    return (
      <div style={styles.mainRepo}>
        <div
          style={styles.repoContainer}>
          <div style={styles.line}>
            <div style={styles.fullName}>
              <h1 style={styles.font}>{repo.getIn([ 'owner', 'login' ])}</h1>
              {
                repo.size > 0 && (
                  <a href={repo.get('html_url')} target="_blank">
                    <h1 style={styles.name}>
                      <span style={styles.slash}>/</span><span style={styles.font}>{ repo.get('name') }</span>
                    </h1>
                  </a>
                )
              }
            </div>
          </div>
          <div style={styles.description}>
            { repo.get('description') }
          </div>
          <div style={Object.assign({}, styles.line, styles.second, border)}>
            {
              repo.size > 0 && (
                <div style={styles.subline}>
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
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
