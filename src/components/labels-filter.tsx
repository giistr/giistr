import * as React from 'react';
import { Tag } from './tag';

interface MainProps {
  labels: any;
  onToggleTag: Function;
  selected: any;
};

const styles = {
  container: {
    maxHeight: 300,
    overflow: 'auto'
  }
};

class LabelsFilters extends React.Component<MainProps, any> {

  public render() {
    const { labels, onToggleTag, selected } = this.props;

    return (
      <div style={styles.container}>
      {
        labels.map((label, key) =>
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
      </div>
    );
  }
}

export default LabelsFilters
