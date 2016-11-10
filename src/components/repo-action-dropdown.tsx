import * as React from 'react';
import { Colors } from '../style';

const base = {};

class RepoActionsDropdown extends React.Component<any, any> {

  public state = {
    focused: false
  };

  private onFocus = () => {
    this.setState({
      focused: !this.state.focused
    });
  };

  public render() {
    return (
        <div>
          <img src="/assets/arrow.svg" onClick={this.onFocus}/>
          {
            this.state.focused && (
              <ul>
                <li>Add to list</li>
                <li>Add to list 2</li>
                <li>Add to list 3</li>
                <li>Add to list 4</li>
              </ul>
            )
          }
        </div>
    );
  }
}

export default RepoActionsDropdown;
