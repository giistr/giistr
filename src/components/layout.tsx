import * as React from 'react';
import { OrderedMap, Map } from 'immutable';

import RepoColumn from '../components/repo-column';
import LoadMore from '../components/load-more';

interface MainProps {
  column: number;
  repositories: OrderedMap<number, any>;
  onClickMore: Function;
  loaded: boolean;
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

const fakeRepos = OrderedMap<number, any>({
  123190283028: Map<string, any>(),
  123190283029: Map<string, any>(),
  123190283030: Map<string, any>(),
  123190283031: Map<string, any>()
});

class Layout extends React.Component<MainProps, any> {

  private renderSingleColumn(repositories, loaded) {
    if (!loaded) {
      repositories = repositories.merge(fakeRepos);
    }

    return (
      <div style={styles.singleContainer}>
        <RepoColumn repositories={repositories}/>
      </div>
    );
  }

  private renderDoubleColumn(repositories, loaded) {
    let firstColumn = repositories.take(Math.ceil(repositories.size / 2)).toOrderedMap();
    let secondColumn = repositories.takeLast(repositories.size / 2).toOrderedMap();

    if (!loaded) {
      firstColumn = firstColumn.merge(fakeRepos);
      secondColumn = secondColumn.merge(fakeRepos);
    }

    return (
      <div style={styles.doubleContainer}>
        <RepoColumn repositories={firstColumn}/>
        <RepoColumn repositories={secondColumn}/>
      </div>
    );
  }

  public render() {
    const { column, repositories, onClickMore, loaded } = this.props;

    return (
      <div style={styles.container}>
        {
          column === 1 && this.renderSingleColumn(repositories, loaded)
        }
        {
          column === 2 && this.renderDoubleColumn(repositories, loaded)
        }
        {
          loaded && (
            <LoadMore
              onClickMore={onClickMore}/>
          )
        }
      </div>
    );
  }
}

export default Layout;
