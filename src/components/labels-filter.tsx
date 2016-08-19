import * as React from 'react';
import { Tag } from './tag';
import { Colors } from '../style';

interface MainProps {
  labels: any;
  onToggleTag: Function;
  selected: any;
};

const buttonStyle = {

}

const styles = {
  container: {},
  more: {
    marginLeft: 6,
    fontSize: 12,
    lineHeight: '18px',
    color: Colors.blue,
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  moreContainer: {
    display: 'flex'
  }
};

const shift = 10;

class LabelsFilters extends React.Component<MainProps, any> {

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
      <div style={styles.container}>
      {
        labels.take(display).map((label, key) =>
          <Tag
            key={key}
            style={{
              margin: 6
            }}
            onSelect={onToggleTag.bind(this, label.get('id'))}
            inactive={!selected.includes(label.get('id'))}
            label={label}/>
        ).toArray()
      }
      {
        labels.size > display && (
          <div style={styles.moreContainer}>
            <div style={styles.more} onClick={this.onShowMore.bind(this, this.state.display + shift)}>
              Show more
            </div>
            <div style={styles.more} onClick={this.onShowMore.bind(this, labels.size)}>
              Show all
            </div>
          </div>
        )
      }
      </div>
    );
  }
}

export default LabelsFilters;
