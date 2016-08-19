import * as React from 'react';
import { Colors } from '../style';
import Button from './button';

interface MainProps {
  onClickMore: Function;
};

const styles = {

};

class LoadMore extends React.Component<MainProps, any> {
  public render() {
    const { onClickMore } = this.props;

    return (
      <div>
        <div>
          <img src="/assets/warning.svg"/>
          <div>Psst! you can load more repositories</div>
        </div>
        <Button
          onClick={onClickMore}
          title="See more repositories"/>
      </div>
    );
  }
}

export default LoadMore;
