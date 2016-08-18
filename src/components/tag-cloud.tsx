import * as React from 'react';
import { Colors } from '../style';
import { Tag } from './tag';
import { fromJS } from 'immutable';

const labels = fromJS([
  {
    "url": "https://api.github.com/repos/ptmt/react-native-macos/labels/bug",
    "name": "bug",
    "color": "fc2929",
    "id": "f1762f35158225d09b6116287397b3ec98947a35"
  },
  {
    "url": "https://api.github.com/repos/andrewdavey/immutable-devtools/labels/enhancement",
    "name": "enhancement",
    "color": "84b6eb",
    "id": "1ea222e004a6e222f8606ab0f1a97eda0ac8ed24"
  },
  {
    "url": "https://api.github.com/repos/rg3/youtube-dl/labels/request",
    "name": "request",
    "color": "165725",
    "id": "89af4c13c8331c358befa9686d79e55216bb1ebe"
  }
]);

export function TagCloud() {
  return (
    <div>
      {
        labels.map((label, index) =>
          <Tag key={index} label={label}/>
        )
      }
    </div>
  );
}
