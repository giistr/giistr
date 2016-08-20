import * as React from 'react';
import { Colors } from '../style';

const base = {
  height: 24,
  width: 16,
  verticalAlign: 'middle',
  marginLeft: 6,
  marginBottom: 5,
  display: 'inline-block'
};

export class BlinkSquare extends React.PureComponent<{}, any> {
  state = {
    color: Colors.blue
  };

  public componentWillMount() {
    setInterval(() => {
      this.setState({
        color: 'transparent'
      });

      setTimeout(() => {
        this.setState({
          color: Colors.blue
        });
      }, 500)
    }, 1000);
  }

  public render() {
    const style = Object.assign({}, base, { backgroundColor: this.state.color });

    return (
      <div style={style}></div>
    );
  }
}
