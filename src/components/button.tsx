import * as React from 'react';
import { Colors } from '../style';

interface MainProps {
  onClick: Function;
  title: string;
};

const styles = {
  container: {
    lineHeight: '40px',
    margin: '14px 0px',
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 300,
    color: Colors.blue,
    backgroundColor: Colors.blueBackground,
    border: `1px solid ${Colors.blueBorder}`,
    boxShadow: '0 1px 2px 0 rgba(20, 22, 36, 0.08)',
    borderRadius: 5
  }
};

class Button extends React.Component<MainProps, any> {
  public render() {
    const { onClick, title } = this.props;

    return (
      <button style={styles.container} onClick={onClick}>{ title }</button>
    );
  }
}

export default Button;
