import * as React from 'react';
import { Colors } from '../style';
import { connect } from 'react-redux';
import { Issue } from './issue';

const styles = {
  container: {
    margin: '10px 20px',
    border: `1px solid ${Colors.borderGrey}`,
    overflow: 'auto',
    minHeight: 10,
    maxHeight: 420,
    borderRadius: 5
  },
  more: {
    fontSize: 12,
    lineHeight: '18px',
    color: Colors.blue,
    textDecoration: 'underline',
    cursor: 'pointer',
    margin: '10px 20px',
    textAlign: 'right'
  },
  space: {
    height: 20
  }
};

interface MainProps {
  issues: any;
  onLoadMore: Function;
};

class Issues extends React.PureComponent<MainProps, any> {

  public state = {
    page: 1,
    limit: this.props.issues.size < 30
  };

  private onSeeMore = () => {
    const { onLoadMore } = this.props;

    this.setState({
      page: this.state.page + 1
    });

    onLoadMore(this.state.page + 1).then(issues => {
      if (issues.size < 30) {
        this.setState({
          limit: true
        });
      }
    });
  }

  public render() {
    const { issues } = this.props;
    const { limit } = this.state;

    return (
      <div>
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
        {
          !limit ? (
            <div style={styles.more} onClick={this.onSeeMore}>See more issues</div>
          ) : (
            <div style={styles.space}></div>
          )
        }
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
