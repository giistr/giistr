import * as React from 'react';

import { connect } from 'react-redux';
import { OrderedMap, Set } from 'immutable';
import { getRepos, clear } from '../actions/repositories';
import { getIssues } from '../actions/issues';
import { Repository } from '../reducers/repository';
import { Issue } from '../reducers/issues';

import { Colors } from '../style';
import ToolBar from '../components/toolbar';
import Issues from '../components/issues';

const styles = {
  mainList: {
    maxWidth: 600,
    margin: '0px auto',
    marginTop: 100
  },
  repoContainer: {
    padding: 10,
    margin: '10px auto',
    border: `1px solid ${Colors.grey}`,
    borderRadius: 5,
    backgroundColor: Colors.lightGrey,
    cursor: 'pointer',
    display: 'flex'
  },
  name: {
    flex: 8
  },
  language: {
    flex: 3
  },
  issues: {
    flex: 1
  }
};

declare var process: any;
const env = process.env.NODE_ENV;

interface MainProps {
  clear: any;
  dispatch: any;
  getRepos: any;
  getIssues: any;
  repositories: OrderedMap<number, Repository>;
  languages: Set<string>
};

const initialState = {
  page: 1,
  username: '',
  selected: Set(),
  languageFilter: undefined
};

class Main extends React.Component<MainProps, any> {

  public state = initialState;

  private onGetRepository(page) {
    const { username } = this.state;
    const { dispatch, getRepos } = this.props;

    dispatch(getRepos(username, page));
  };

  private onUserQuery = evt => {
    this.setState({
      username: evt.target.value
    });
  };

  private onClickRepository(id) {
    const { selected } = this.state;
    const { dispatch, getIssues, repositories } = this.props;
    const repo = repositories.get(id);

    if(repo.get('open_issues') > 0 && !selected.includes(id)) {
      dispatch(getIssues(repo.get('full_name'), id));
    }

    if(selected.includes(id)) {
      this.setState({
        selected: selected.remove(id)
      });
    } else {
      this.setState({
        selected: selected.add(id)
      });
    }
  }

  private onNext(page) {
    if(this.state.username) {
      this.setState({ page });
      this.onGetRepository(page);
    } else {
      console.warn("Please enter a valid username");
    }
  };

  private selectLanguage = languageFilter => {
    this.setState({ languageFilter });
  };

  private clearList = () => {
    const { dispatch, clear } = this.props;
    dispatch(clear());
    this.setState(initialState);
  };

  public render() {
    let { repositories, languages } = this.props;
    const { selected, page, languageFilter } = this.state;

    if(languageFilter) {
      repositories = repositories.filter(repo => repo.get('language') === languageFilter).toOrderedMap();
    }

    return (
      <div>
        <ToolBar
          onSelectLanguage={this.selectLanguage}
          onClear={this.clearList}
          onUserQuery={this.onUserQuery}
          onGetRepository={this.onGetRepository.bind(this, page)}
          onNext={this.onNext.bind(this, page + 1)}
          languages={languages}/>
        <ul style={styles.mainList}>
          {
            repositories.map((repo, key) => (
              <li
                key={key}>
                <div
                  style={styles.repoContainer}
                  onClick={this.onClickRepository.bind(this, repo.get('id'))}>
                  <div style={styles.name}>
                    { repo.get('full_name') }
                  </div>
                  <div style={styles.language}>
                    { repo.get('language') }
                  </div>
                  <div style={styles.issues}>
                    { repo.get('open_issues') }
                  </div>
                </div>
                {
                  selected
                    .includes(repo.get('id')) &&
                    <Issues issues={repo.get('issues')}/>
                }
              </li>
            )).toArray()
          }
        </ul>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  repositories: state
    .get('repository')
    .map(repo =>
      repo.set('issues', state.get('issues').filter(issue => issue.get('repoId') === repo.get('id')))
    ),
  languages: Set<string>(
    state
      .get('repository')
      .map(repo => repo.get('language'))
      .toList()
      .filter(Boolean)
  )
}), dispatch => ({
  getIssues,
  getRepos,
  clear,
  dispatch
}))(Main);
