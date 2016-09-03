import * as React from 'react';
import { Colors } from '../style';

const container = {
  position: 'absolute',
  overflow: 'hidden',
  left: 0,
  top: 0,
  zIndex: -1
};

export class BackgroundCover extends React.PureComponent<any, any> {

  public refs: {
    [T: string]: any;
    canvas: any;
  };

  private drawCircle(ctx) {
    return (x, y, radius) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.strokeStyle = Colors.blueBackgroundMiddle;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };
  }

  public componentDidMount() {
    const canvas = this.refs.canvas;
    const cw = canvas.width;
    const ch = canvas.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    const draw = this.drawCircle(ctx);
    const ww = window.innerWidth;

    draw(cw / 1.5, ch, ww / 5);
    draw(cw - (cw / 1.2) , ch / 1.1, ww / 2.8);
    draw(cw / 3 , ch - (ch / 1.4), ww / 3.5);
    draw(cw / 1.1 , ch + ch / 5, ww / 5);
  }

  public render() {
    return (
      <div>
        <canvas ref="canvas" style={container} width={window.innerWidth} height={window.innerHeight}/>
      </div>
    );
  }
}
