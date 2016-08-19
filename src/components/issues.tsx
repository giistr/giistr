import * as React from 'react';
import { Colors } from '../style';
import * as moment from 'moment';
import { Tag } from './tag';
import { connect } from 'react-redux';

interface MainProps {
  issues: any;
};

const styles = {
  main: {
    marginLeft: 10
  },
  container: {
    margin: '10px 20px',
    border: `1px solid ${Colors.borderGrey}`,
    overflow: 'auto',
    minHeight: 10,
    maxHeight: 420,
    borderRadius: 5
  },
  issueItem: {
    borderBottom: `1px solid ${Colors.borderGrey}`,
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '30px',
    cursor: 'pointer'
  },
  title: {
    margin: '16px 20px'
  },
  title2: {
    flex: 1,
    opacity: 0.9,
    fontWeight: 100,
    fontSize: 14
  },
  line: {
    flex: 1,
    display: 'flex',
    color: Colors.grey,
    fontSize: 14
  },
  secondLine: {
    flex: 1,
    display: 'flex',
    color: Colors.lightGrey
  },
  updated: {
    marginLeft: 20
  },
  light: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    display: 'inline-block',
    backgroundColor: Colors.green,
    marginRight: 10
  },
  tagContainer: {
    display: 'flex',
    marginLeft: 20
  },
  milestone: {
    marginLeft: 20
  },
  icon: {
    display: 'inline-block',
    marginRight: 5
  },
  convers: {
    marginLeft: 10
  }
};

class Issues extends React.Component<MainProps, any> {

  private onClickIssue(url) {
    window.open(url, '_blank');
  }

  public render() {
    const { issues } = this.props;

    return (
      <div style={styles.main}>
        <h2 style={styles.title}>Issues</h2>
        <ul style={styles.container}>
          {
            issues.toList().map((issue, index) => {
              const updated = moment(issue.get('updated_at')).format('MMMM Do YYYY');
              let style = styles.issueItem;
              if (index === issues.size - 1) {
                style = Object.assign({}, styles.issueItem, { borderBottom: 'none' });
              }

              return (
                <li
                  onClick={this.onClickIssue.bind(this, issue.get('html_url'))}
                  style={style}
                  key={index}>
                  <h2 style={styles.title2}>{ issue.get('title') }</h2>
                  <div style={styles.line}>
                    <div><div style={styles.light}></div>Open</div>
                    <div style={styles.updated}>Updated: { updated }</div>
                    <div style={styles.tagContainer}>
                      {
                        issue.get('labelsIds').map((label, key) =>
                          <Tag label={label} key={key}/>
                        )
                      }
                    </div>
                  </div>
                  <div style={styles.secondLine}>
                    <div>
                      <img style={styles.icon} src="../assets/user.svg"/>
                      { issue.get('assignees').size }
                    </div>
                    <div style={styles.convers}>
                      <img style={styles.icon} src="../assets/convers.svg"/>
                      { issue.get('comments') }
                    </div>
                    <div style={styles.milestone}>No Milestone</div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  issues: props.issues
    .map(issue =>
      issue.update('labelsIds', labelsIds =>
        labelsIds.map(labelId =>
          state.getIn([ 'label', labelId ])
        )
      )
    )
}), null)(Issues);
