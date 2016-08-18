import * as React from 'react';
import { Colors } from '../style';

const base = {
};

const title = {
  lineHeight: '34px',
  fontSize: 26,
  padding: '0px 2px',
  fontWeight: 100,
  color: Colors.grey,
  borderRadius: 4,
  backgroundColor: Colors.blueBackground,
  display: 'inline-block',
  letterSpacing: 2
};

const slash = {
  color: Colors.blue,
  fontWeight: 400
};

export function Logo({
  style
}: {
  style?: Object
}) {

  const final = Object.assign({}, base, style);

  return (
    <div style={final}>
      <h1 style={title}><span style={slash}>/</span>Giistr</h1>
    </div>
  );
}
