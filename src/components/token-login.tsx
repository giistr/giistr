import * as React from 'react';
import { Colors } from '../style';

interface MainProps {
  onClickLogin: Function;
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 300
  },
  input: {
    lineHeight: '40px',
    borderRadius: 5,
    border: `1px solid ${Colors.lightlightGrey}`,
    fontSize: 15,
    paddingLeft: 14,
    color: Colors.lightGrey,
    fontWeight: 100
  },
  startButton: {
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

class TokenLogin extends React.Component<MainProps, any> {

  public state = {
    query: ''
  };

  private onChangeToken = (evt) => {
    this.setState({
      query: evt.target.value
    });
  };

  public render() {
    const { onClickLogin } = this.props;

    return (
      <div style={styles.container}>
        <input
          style={styles.input}
          onChange={this.onChangeToken}
          type="text"
          placeholder="Enter token"/>
        <button style={styles.startButton} onClick={onClickLogin}>Let's start</button>
      </div>
    );
  }
}

export default TokenLogin;
