import * as React from 'react';
import { Colors } from '../style';
import { connect } from 'react-redux';
import { Issue } from './issue';
import { RawButton } from './raw-button';

const containerMaxHeight = 420;

const styles = {
  container: {
    margin: '10px 20px',
    border: `1px solid ${Colors.borderGrey}`,
    overflow: 'auto',
    minHeight: 10,
    maxHeight: containerMaxHeight,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  more: {
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

const shift = 4;

class Issues extends React.PureComponent<MainProps, any> {

  public state = {
    page: 1,
    limit: this.props.issues.size < 30,
    rendered: shift
  };

  public refs: {
    [T: string]: any;
    container: any;
  };

  private contentHeight = 0;

  public componentDidMount() {
    const { container } = this.refs;
    if (container.offsetHeight === containerMaxHeight) {
      this.contentHeight = this.getContentHeight(container);

      container.addEventListener('mousewheel', this.onMousewheel.bind(this, container));
    }
  }

  public componentWillUnmount() {
    this.refs.container.removeEventListener('mousewheel', this.onMousewheel);
  }

  public componentDidUpdate(prevProps, prevState) {
    if (prevState.rendered !== this.state.rendered) {
      this.contentHeight = this.getContentHeight(this.refs.container);
    }
  }

  private getContentHeight = container => {
    return [].slice
      .call(container.children)
      .reduce((height, child) =>
        height + child.offsetHeight
      , 0);
  };

  private onMousewheel(container, e) {
    const didReachTop = (container.scrollTop === 0 && e.wheelDeltaY > 0);
    const didReachBottom = (container.scrollTop >= (this.contentHeight - containerMaxHeight) && e.wheelDeltaY < 0);

    if (didReachTop || didReachBottom) {
      e.preventDefault();
    }

    if (didReachBottom && this.state.rendered < this.props.issues.size) {
      this.setState({
        rendered: this.state.rendered + shift
      });
    }
  }

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
    const { limit, rendered } = this.state;

    return (
      <div>
        <ul style={styles.container} ref="container">
          {
            issues.toList().take(rendered).map((issue, index) => {
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
            <RawButton
              style={styles.more}
              onClick={this.onSeeMore}>
              See more issues
            </RawButton>
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
