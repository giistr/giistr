import * as React from 'react';

const base = {};

const logo = {
  width: 80
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
