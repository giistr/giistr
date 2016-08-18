import * as React from 'react';
import { Colors } from '../style';

const container = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: -1
};

const circle = {
  position: 'absolute',
  borderRadius: '50%',
  border: `1px solid ${Colors.borderGrey}`
};

const extendCircle = style => Object.assign({}, circle, style);

const leftCircle = extendCircle({
  left: -window.innerWidth/4,
  top: window.innerHeight/12,
  bottom: -window.innerHeight/12,
  right: window.innerWidth/2.45
});

const middleCircle = extendCircle({
  right: 0,
  top: window.innerHeight/1.5,
  bottom: -window.innerHeight/3,
  left: window.innerWidth/2
});

export function BackgroundCover() {

  return (
    <div style={container}>
      <div style={leftCircle}></div>
      <div style={middleCircle}></div>
    </div>
  );
}
