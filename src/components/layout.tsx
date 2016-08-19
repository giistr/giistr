import * as React from 'react';
import { Colors } from '../style';
import { OrderedMap, Range } from 'immutable';

import RepoColumn from '../components/repo-column';
import LoadMore from '../components/load-more';

interface MainProps {
  column: number;
  repositories: OrderedMap<number, any>;
  onClickMore: Function;
};

const styles = {
  container: {
    flex: 1
  },
  singleContainer: {
    maxWidth: 800,
    margin: '0px auto'
  },
  doubleContainer: {
    display: 'flex'
  }
};

class Layout extends React.Component<MainProps, any> {

  private renderSingleColumn(repositories) {
    return (
      <div style={styles.singleContainer}>
        <RepoColumn repositories={repositories}/>
      </div>
    );
  }

  private renderDoubleColumn(repositories) {
    const firstColumn = repositories.take(Math.ceil(repositories.size / 2)).toOrderedMap();
    const secondColumn = repositories.takeLast(repositories.size / 2).toOrderedMap();

    return (
      <div style={styles.doubleContainer}>
        <RepoColumn repositories={firstColumn}/>
        <RepoColumn repositories={secondColumn}/>
      </div>
    );
  }

  public render() {
    const { column, repositories, onClickMore } = this.props;

    return (
      <div style={styles.container}>
        {
          column === 1 && this.renderSingleColumn(repositories)
        }
        {
          column === 2 && this.renderDoubleColumn(repositories)
        }
        <LoadMore
          onClickMore={onClickMore}/>
      </div>
    );
  }
}

export default Layout;
