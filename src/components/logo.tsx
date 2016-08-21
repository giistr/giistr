import * as React from 'react';
import { Colors } from '../style';

const base = {
};

const logo = {

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
      <img style={logo} src="/assets/logo.svg"/>
    </div>
  );
}
