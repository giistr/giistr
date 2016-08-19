import * as React from 'react';
import { Colors } from '../style';
import { connect } from 'react-redux';
import { Issue } from './issue';

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
  title: {
    margin: '16px 20px'
  },
  more: {
    fontSize: 12,
    lineHeight: '18px',
    color: Colors.blue,
    textDecoration: 'underline',
    cursor: 'pointer',
    margin: '10px 20px',
    textAlign: 'right'
  }
};

interface MainProps {
  issues: any;
  onLoadMore: Function;
};

class Issues extends React.PureComponent<MainProps, any> {

  public state = {
    page: 1
  };

  public shouldComponentUpdate(nextProps) {
    return nextProps.issues.equals(this.props.issues);
  }

  private onSeeMore = () => {
    const { onLoadMore } = this.props;

    this.setState({
      page: this.state.page + 1
    });

    onLoadMore(this.state.page + 1);
  }

  public render() {
    const { issues } = this.props;

    return (
      <div style={styles.main}>
        <h2 style={styles.title}>Issues</h2>
        <ul style={styles.container}>
          {
            issues.toList().map((issue, index) => {
              return (
                <Issue
                  key={index}
                  issue={issue}
                  isLast={index === issues.size - 1}/>
              );
            })
          }
        </ul>
        <div style={styles.more} onClick={this.onSeeMore}>See more issues</div>
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
