import * as React from 'react';
import { Colors } from '../style';

const container = {
  display: 'flex',
  lineHeight: '20px',
  color: Colors.grey
};

const base = {
  backgroundColor: Colors.borderGrey,
  width: 18,
  height: 18,
  borderRadius: '50%',
  position: 'relative',
  marginRight: 10,
  cursor: 'pointer'
};

const light = {
  position: 'absolute',
  backgroundColor: Colors.blue,
  width: 10,
  height: 10,
  margin: 'auto',
  borderRadius: '50%',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

export function Check({
  onSelect,
  inactive,
  style
}: {
  onSelect?: Function,
  inactive?: Boolean,
  style?: Object
}) {

  return (
    <div style={container}>
      <div style={base} onClick={onSelect}>
        {
          !inactive && (
            <div style={light}>
            </div>
          )
        }
      </div>
      { inactive ? 'Off' : 'On' }
    </div>
  );
}
