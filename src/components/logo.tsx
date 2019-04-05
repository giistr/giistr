import * as React from 'react';

const base = {};

export function Logo({ style, width }: { style?: Object; width?: number }) {
  const final = Object.assign({}, base, style);

  return (
    <div style={final}>
      <img style={{ width: width || 90 }} src="/assets/logo.svg" />
    </div>
  );
}
