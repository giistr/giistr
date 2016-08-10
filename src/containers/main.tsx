import * as React from 'react';

interface MainProps {
  name: string;
  dispatch: any;
}

export default class Main extends React.Component<MainProps, any> {
  name: string;

  render() {
    const { name } = this.props;

    return (
      <div>
      </div>
    );
  }
}
