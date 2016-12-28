import * as React from 'react';
import { MouseEventHandler } from 'react';
import { Colors } from '../style';

interface MainProps {
  onClick?: MouseEventHandler<any>;
  style?: Object;
};

const base = {
  lineHeight: '40px',
  margin: '14px 0px',
  cursor: 'pointer',
  fontSize: 15,
  fontWeight: 300,
  color: Colors.blue,
  outline: 'none',
  border: `1px solid ${Colors.blueBorder}`,
  boxShadow: '0 1px 2px 0 rgba(20, 22, 36, 0.08)',
  borderRadius: 5
};

class Button extends React.Component<MainProps, { color: string; }> {

  public state = {
    color: Colors.blueBackground
  };

  private onOver = () => {
    this.setState({
      color: Colors.blueBackgroundDark
    });
  };

  private onMouseOut = () => {
    this.setState({
      color: Colors.blueBackground
    });
  };

  public render() {
    const { onClick, children, style } = this.props;
    const final = Object.assign({}, base, style, {
      backgroundColor: this.state.color
    });

    return (
      <button
        onMouseOver={this.onOver}
        onMouseOut={this.onMouseOut}
        style={final}
        onClick={onClick}>
        { children }
      </button>
    );
  }
}

export default Button;
