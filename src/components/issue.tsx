import * as React from 'react';
import { Colors } from '../style';
import { Map } from 'immutable';
import * as moment from 'moment';
import { Tag } from './tag';

interface MainProps {
  issue: Map<string, any>;
  isLast: Boolean;
};

const styles = {
  issueItem: {
    borderBottom: `1px solid ${Colors.borderGrey}`,
    margin: '0px 20px',
    padding: '20px 0px',
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '30px',
    cursor: 'pointer'
  },
  title2: {
    flex: 1,
    opacity: 0.9,
    fontWeight: 400,
    fontSize: 14
  },
  line: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    color: Colors.grey,
    fontSize: 14
  } as React.CSSProperties,
  pr: {
    marginLeft: 10,
    color: Colors.lightGrey
  },
  updatedValue: {
    color: Colors.middleGrey
  },
  secondLine: {
    flex: 1,
    display: 'flex'
  },
  tagContainer: {
    display: 'flex',
    marginTop: 14
  },
  milestone: {
    marginLeft: 20,
    fontSize: 13
  },
  icon: {
    display: 'inline-block',
    marginRight: 5
  },
  item: {
    marginLeft: 10,
    display: 'flex'
  },
  secondColumn: {
    color: Colors.lightGrey,
    display: 'flex'
  },
  column: {
    display: 'flex',
    alignItems: 'center'
  },
  light: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: Colors.green,
    marginRight: 10
  }
};

export class Issue extends React.PureComponent<MainProps, any> {

  public shouldComponentUpdate(nextProps) {
    return !nextProps.issue.equals(this.props.issue) || nextProps.isLast !== this.props.isLast;
  }

  private onClickIssue(url) {
    window.open(url, '_blank');
  }

  public render() {
    const { issue, isLast } = this.props;
    const updated = moment(issue.get('updated_at')).format('DD/MM/YYYY');

    let style = styles.issueItem;
    if (isLast) {
      style = Object.assign({}, styles.issueItem, { borderBottom: 'none' });
    }

    return (
      <li
        onClick={this.onClickIssue.bind(this, issue.get('html_url'))}
        style={style}>
        <h2 style={styles.title2}>{ issue.get('title') }</h2>
        <div style={styles.line}>
          <div style={styles.column}>
            {
              issue.get('state') === 'open' && (
                <div style={styles.light}></div>
              )
            }
            <div style={styles.updatedValue}>Updated: <span>{ updated }</span></div>
            {
              issue.get('pull_request') && (
                <div style={styles.pr}>(Pull request)</div>
              )
            }
          </div>
          <div style={styles.secondColumn}>
            <div style={styles.item}>
              <img style={styles.icon} src="/assets/user.svg"/>
              { issue.get('assignees').size }
            </div>
            <div style={styles.item}>
              <img style={styles.icon} src="/assets/convers.svg"/>
              { issue.get('comments') }
            </div>
          </div>
        </div>
        <div style={styles.secondLine}>
          <div style={styles.tagContainer}>
            {
              issue.get('labelsIds').map((label, key) =>
                <Tag label={label} key={key}/>
              )
            }
          </div>
        </div>
      </li>
    );
  }
}
