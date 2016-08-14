import * as React from 'react';

interface MainProps {};

const styles = {};

class Landing extends React.Component<MainProps, any> {

  state = {
    username: ''
  }

  private _onUserQuery = evt => {
    this.setState({
      username: evt.target.value
    });
  };

  private _onSearch = () => {

  };

  public render() {
    const {} = this.props;

    return (
      <div>
        <input type="text" placeholder="Enter github user account" onChange={this._onUserQuery}/>
        <button onClick={this._onSearch}>Search</button>
      </div>
    )
  }
}

export default Landing;
