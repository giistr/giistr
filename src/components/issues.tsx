import * as React from 'react';

interface MainProps {
  issues: any;
};

const styles = {
  container: {
    backgroundColor: '#F4F4F4',
    margin: '10px auto',
    minHeight: 10
  },
  issueItem: {
    borderBottom: '1px dashed #bbbbbb',
    padding: 10
  }
};

class Issues extends React.Component<MainProps, any> {
  public render() {
    const { issues } = this.props;

    return (
      <ul style={styles.container}>
        {
          issues.map((issue, key) => (
            <li
              style={styles.issueItem}
              key={key}>
              { issue.get('title') }
              <a href={issue.get('html_url')} target="_blank">Link</a>
            </li>
          )).toArray()
        }
      </ul>
    );
  }
}

export default Issues;
