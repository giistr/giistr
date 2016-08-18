import * as React from 'react';
import { Colors } from '../style';
import { Tag } from './tag';
import { fromJS } from 'immutable';

const labels = fromJS([
  {

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
