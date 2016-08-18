import * as React from 'react';

interface MainProps {
  onClickLogin: Function;
};

const styles = {

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
      <div>
        <input onChange={this.onChangeToken} type="text" placeholder="Enter token"/>
        <button onClick={onClickLogin}>Start</button>
      </div>
    );
  }
}

export default TokenLogin;
