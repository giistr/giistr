import * as React from 'react';
import { MouseEventHandler } from 'react';
import { OrderedMap, Map } from 'immutable';
import { connect } from 'react-redux';

import RepoColumn from '../components/repo-column';
import LoadMore from '../components/load-more';

export interface MainProps {
  repositories: OrderedMap<number, any>;
  onClickMore: MouseEventHandler<any>;
  onClickAll: MouseEventHandler<any>;
  loaded: boolean;
  hasNext: boolean;
};

export interface MainState {
  column: number;
}

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

export class Layout extends React.Component<MainProps, MainState> {

  public state = {
    column: window.innerWidth >= 1440 ? 2 : 1
  };

  public componentWillMount() {
    window.addEventListener('resize', this.onWindowResize, true);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  private onWindowResize = () => {
    if (window.innerWidth >= 1440 && this.state.column === 1) {
      this.setState({ column: 2 });
    }

    if (window.innerWidth < 1440 && this.state.column === 2) {
      this.setState({ column: 1 });
    }
  };

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
    const { repositories, onClickMore, onClickAll, loaded, hasNext } = this.props;
    const { column } = this.state;

    return (
      <div style={styles.container}>
        {
          column === 1 && this.renderSingleColumn(repositories, loaded)
        }
        {
          column === 2 && this.renderDoubleColumn(repositories, loaded)
        }
        {
          loaded && hasNext && (
            <LoadMore
              onClickAll={onClickAll}
              onClickMore={onClickMore}/>
          )
        }
      </div>
    );
  }
}

export default connect<any, any, any>((state, props) => ({
  loaded: !state.getIn([ 'config', 'loading' ], false)
}), null)(Layout);
