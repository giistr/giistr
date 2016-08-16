import * as React from 'react';
import { connect } from 'react-redux';
import { Tag } from './tag';

interface MainProps {
  labels: any;
};

const styles = {
  container: {
    maxHeight: 300,
    overflow: 'auto'
  }
};

class LabelsFilters extends React.Component<MainProps, any> {

  private onSelectTag(id) {

  }

  public render() {
    const { labels } = this.props;

    return (
      <div style={styles.container}>
      {
        labels.map(label =>
          <Tag
            onSelect={this.onSelectTag.bind(this, label.get('id'))}
            inactive={true}
            label={label}/>
        )
      }
      </div>
    );
  }
}

export default
connect((state, props) => ({
  labels: state.get('label')
}), null)(LabelsFilters);
