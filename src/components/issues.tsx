interface MainProps {
  issues: any;
};

const styles = {
  container: {
    margin: '10px auto',
    minHeight: 10
  }
};

class Issues extends React.Component<MainProps, any> {
  public render() {
    const { issues } = this.props;

    return (
      <ul style={styles.container}>
        {
          issues.map(issue => (
            <li>
              { issue.get('title') }
            </li>
          ))
        }
      </ul>
    )
  }
}

export default Issues;
