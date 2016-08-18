import * as React from 'react';
import { connect } from 'react-redux';
import { Set, Map } from 'immutable';
import Input from './input-autocomplete';
import { Colors } from '../style';
import UserCard from './user-card';
import { User } from '../reducers/user';
import LabelsFilter from './labels-filter';
import { FILTER_KEYS } from '../constants/filters';
import { remove, add, replace, reset } from '../actions/filters';
import { Check } from './check';
const [ languages, period, labels, withIssues, withoutAssignee ] = FILTER_KEYS;

interface MainProps {
  languages: Set<string>;
  user: User;
  labels: any;
  filters: Map<string, any>;
  dispatch: any;
  remove: any;
  add: any;
  replace: any;
  reset: any;
};

const styles = {
  container: {
    backgroundColor: 'white',
    flex: 3,
    borderLeft: `1px solid ${Colors.borderGrey}`,
    transform: 'translateY(-110px)'
  },
  languageFilter: {},
  filterTitle: {
    backgroundColor: 'rgba(20, 22, 36, 0.02)',
    color: Colors.lightGrey,
    padding: '10px 0px',
    paddingLeft: 20,
    fontSize: 14,
    borderTop: `1px solid ${Colors.borderGrey}`
  },
  section: {
    padding: 20
  },
  checkSection: {
    display: 'flex',
    justifyContent: 'space-between'
  }
};

class Toolbar extends React.Component<MainProps, any> {
  private onToggleTag = id => {
    const { filters, remove, add, dispatch } = this.props;

    if (filters.get(labels).includes(id)) {
      remove(labels, id)(dispatch);
    } else {
      add(labels, id)(dispatch);
    }
  };

  private onSelectLanguage = language => {
    const { filters, reset, replace, dispatch } = this.props;

    if (filters.get(languages).includes(language) || !language) {
      reset(languages)(dispatch);
    } else {
      replace(languages, language)(dispatch);
    }
  };

  private onSelectPeriod = time => {
    console.log('Select a period');
  };

  private onToggleAssignee = val => {
    const { replace, dispatch } = this.props;

    replace(withoutAssignee, !val)(dispatch);
  };

  private onToggleIssues = val => {
    const { replace, dispatch } = this.props;

    replace(withIssues, !val)(dispatch);
  };

  public render() {
    const { user, filters } = this.props;

    return (
      <div style={styles.container}>
        <UserCard user={user}/>
        <div style={styles.filterTitle}>
          Filters
        </div>
        <div style={styles.section}>
          <h3>Period</h3>
          <Input
            onSelect={this.onSelectPeriod}
            style={styles.languageFilter}
            list={Set<string>()}/>
        </div>
        <div style={styles.section}>
          <h3>Languages</h3>
          <Input
            onSelect={this.onSelectLanguage}
            style={styles.languageFilter}
            list={this.props.languages}/>
        </div>
        <div style={Object.assign({}, styles.section, styles.checkSection)}>
          <div>
            <h3>Without assignees</h3>
            <Check
              onSelect={this.onToggleAssignee.bind(this, filters.get(withoutAssignee))}
              inactive={!filters.get(withoutAssignee)}/>
          </div>
          <div>
            <h3>With issues</h3>
            <Check
              onSelect={this.onToggleIssues.bind(this, filters.get(withIssues))}
              inactive={!filters.get(withIssues)}/>
          </div>
        </div>
        <div style={styles.section}>
          <h3>Labels</h3>
          <LabelsFilter
            selected={filters.get(labels)}
            labels={this.props.labels}
            onToggleTag={this.onToggleTag}/>
        </div>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  labels: state.get('label'),
  languages: Set<string>(
    state
      .get('repository')
      .map(repo => repo.get('language'))
      .toList()
      .filter(Boolean)
  )
}), dispatch => ({
  dispatch,
  remove,
  add,
  replace,
  reset
}))(Toolbar);
