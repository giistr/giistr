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
    lineHeight: '30px'
  },
  title: {
    margin: '16px 20px'
  },
  line: {
    flex: 1,
    display: 'flex'
  }
};

class Issues extends React.Component<MainProps, any> {
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
                style={style}
                key={index}>
                  <div style={styles.line}>{ issue.get('title') }</div>
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
