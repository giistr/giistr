import * as React from 'react';
import { Colors } from '../style';

interface MainProps {
  issues: any;
};

const styles = {
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
    fontWeight: 100
  },
  line: {
    flex: 1,
    display: 'flex',
    color: Colors.grey
  }
};

class Issues extends React.Component<MainProps, any> {

  private onClickIssue(url) {
    window.open(url, '_blank');
  }

  public render() {
    const { issues } = this.props;

    return (
      <div>
        <h2 style={styles.title}>Issues</h2>
        <ul style={styles.container}>
          {
            issues.toList().map((issue, index) => {
              const style = index === issues.size - 1 ? Object.assign({}, styles.issueItem, { borderBottom: 'none' }) : styles.issueItem;

              return (
                <li
                onClick={this.onClickIssue.bind(this, issue.get('html_url'))}
                style={style}
                key={index}>
                  <h2 style={styles.title2}>{ issue.get('title') }</h2>
                  <div style={styles.line}>
                    <div>Open</div>
                    <div>Updated at: { issue.get('updated_at') }</div>
                    <div>Bug</div>
                  </div>
                  <div style={styles.line}>
                    <div>{ issue.get('assignees').size }</div>
                    <div>{ issue.get('comments') }</div>
                    <div>No Milestone</div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Issues;
