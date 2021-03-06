import * as React from 'react';
import { Tag } from './tag';
import { RawButton } from './raw-button';

interface MainProps {
  labels: any;
  onToggleTag: Function;
  selected: any;
};

const styles = {
  more: {
    marginLeft: 8
  },
  moreContainer: {
    display: 'flex'
  }
};

const shift = 10;

class LabelsFilters extends React.Component<MainProps, { display: number; }> {

  public state = {
    display: shift
  };

  private onShowMore(display) {
    this.setState({
      display
    });
  }

  public render() {
    const { labels, onToggleTag, selected } = this.props;
    const { display } = this.state;

    return (
      <div>
      {
        labels
          .take(display)
          .map((label, key) =>
            <Tag
              key={key}
              style={{
                marginRight: 11,
                marginLeft: 0,
                marginBottom: 11
              }}
              onSelect={onToggleTag.bind(this, label.get('id'))}
              inactive={!selected.includes(label.get('id'))}
              label={label}/>
          ).toArray()
      }
      {
        labels.size > display && (
          <div style={styles.moreContainer}>
            <RawButton
              style={styles.more}
              onClick={this.onShowMore.bind(this, this.state.display + shift)}>
              Show more
            </RawButton>
            <RawButton
              style={styles.more}
              onClick={this.onShowMore.bind(this, labels.size)}>
              Show all
            </RawButton>
          </div>
        )
      }
      </div>
    );
  }
}

export default LabelsFilters;
