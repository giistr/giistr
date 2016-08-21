import * as React from 'react';
import { Tag } from './tag';
import { fromJS } from 'immutable';

const labels = fromJS([
  {
    url: 'https://api.github.com/repos/ptmt/react-native-macos/labels/bug',
    name: 'bug',
    color: 'fc2929',
    id: 'f1762f35158225d09b6116287397b3ec98947a35',
    style: {
      position: 'absolute',
      bottom: '30%',
      right: '20%'
    }
  },
  {
    url: 'https://api.github.com/repos/andrewdavey/immutable-devtools/labels/enhancement',
    name: 'enhancement',
    color: '84b6eb',
    id: '1ea222e004a6e222f8606ab0f1a97eda0ac8ed24',
    style: {
      position: 'absolute',
      bottom: '20%',
      right: '50%'
    }
  },
  {
    url: 'https://api.github.com/repos/rg3/youtube-dl/labels/request',
    name: 'request',
    color: '165725',
    id: '89af4c13c8331c358befa9686d79e55216bb1ebe',
    style: {
      position: 'absolute',
      bottom: '5%',
      right: '30%'
    }
  }
]);

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
};

export function TagCloud() {
  return (
    <div style={styles.container}>
      {
        labels.map((label, index) =>
          <Tag key={index} style={label.get('style').toJS()} label={label}/>
        )
      }
    </div>
  );
}
