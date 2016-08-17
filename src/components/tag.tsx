import * as React from 'react';
import { convertHex } from '../helpers/color';
import { Colors } from '../style';

const base = {
  padding: '0px 5px',
  display: 'inline-block',
  borderRadius: '10px',
  fontSize: 12,
  height: 24,
  lineHeight: '24px',
  margin: 'auto 4px',
  cursor: 'pointer'
};

export function Tag({ label, onSelect, inactive, style }: { label: any, onSelect?: Function, inactive?: Boolean, style?: Object }) {

  const final = Object.assign({}, base, {
    color: inactive ? Colors.lightGrey : `#${label.get('color')}`,
    backgroundColor: inactive ? Colors.borderGrey : convertHex(label.get('color'), 0.2)
  }, style);

  return (
    <div
      onClick={onSelect}
      style={final}>
      { label.get('name') }
    </div>
  );
}
