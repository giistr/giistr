import * as React from 'react';
import { Colors } from '../style';
import Button from './button';

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
        <Button
          title="Let's start"
          onClick={onClickLogin.bind(this, this.state.query.trim())}/>
      </div>
    );
  }
}

export default TokenLogin;
