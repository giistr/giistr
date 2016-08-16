import * as React from 'react';
import { convertHex } from '../helpers/color';
import { Colors } from '../style';

export function Tag({ label, onSelect, inactive }: { label: any, onSelect?: Function, inactive?: Boolean }) {
  const style = {
    padding: '0px 5px',
    display: 'inline-block',
    borderRadius: '10px',
    color: inactive ? Colors.lightGrey : `#${label.get('color')}`,
    backgroundColor: inactive ? Colors.borderGrey : convertHex(label.get('color'), 0.2),
    fontSize: 12,
    height: 24,
    lineHeight: '24px',
    margin: 'auto 4px',
    cursor: 'pointer'
  };

  return (
    <div
      onClick={onSelect}
      style={style}>
      { label.get('name') }
    </div>
  );
}
