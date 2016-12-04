import * as React from 'react';
import Input from './input-text';
import Nav from './nav';

interface State {
  active: boolean;
}

class ListMenu extends React.Component<null, State> {
  public state = {
    active: false
  };

  private onClick = () => {
    this.setState({
      active: true
    });
  };

  private onValidate = (evt) => {
    if (evt.keyCode === 13) {
      this.setState({
        active: false
      });
    }
  };

  public render() {
    const { active } = this.state;

    return(
      <Nav>
        {
          !active ?
            (
              <div onClick={this.onClick}>
                + Add a list
              </div>
            ) :
            (
              <Input onKeyUp={this.onValidate} placeholder="List name"/>
            )
        }
      </Nav>
    );
  }
}

export default ListMenu;
