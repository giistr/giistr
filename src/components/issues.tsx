import * as React from 'react';
import { Colors } from '../style';

interface MainProps {
  issues: any;
};

const styles = {
  container: {
    margin: '10px 20px',
    borderTop: `1px solid ${Colors.borderGrey}`,
    borderBottom: `1px solid ${Colors.borderGrey}`,
    overflow: 'auto',
    minHeight: 10,
    maxHeight: 420
  },
  issueItem: {
    borderBottom: '1px dashed #bbbbbb',
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
        <h3 style={styles.title}>Issues</h3>
        <ul style={styles.container}>
          {
            issues.map((issue, key) => (
              <li
                style={styles.issueItem}
                key={key}>
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
            )).toArray()
          }
        </ul>
      </div>
    );
  }
}

export default Issues;
