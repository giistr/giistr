import * as React from 'react';

const base = {};

let logo = {
  width: 90
};

export function Logo({
  style,
  width
}: {
  style?: Object,
  width?: number
}) {

  const final = Object.assign({}, base, style);

  if (width) {
    logo.width = width;
  }

  return (
    <div style={final}>
      <img style={logo} src="/assets/logo.svg"/>
    </div>
  );
}
