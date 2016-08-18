import * as React from 'react';
import { Tag } from './tag';
import { Colors } from '../style';

interface MainProps {
  labels: any;
  onToggleTag: Function;
  selected: any;
};

const styles = {
  container: {},
  more: {
    marginLeft: 6,
    fontSize: 12,
    lineHeight: '18px',
    color: Colors.blue,
    textDecoration: 'underline',
    cursor: 'pointer'
  }
};

const shift = 10;

class LabelsFilters extends React.Component<MainProps, any> {

  public state = {
    display: shift
  };

  private onShowMore = () => {
    this.setState({
      display: this.state.display + shift
    });
  };

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
          <div style={styles.more} onClick={this.onShowMore}>
            Show more
          </div>
        )
      }
      </div>
    );
  }
}

export default LabelsFilters;
