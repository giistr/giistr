import * as React from 'react';
import { connect } from 'react-redux';
import { Set, List, Map } from 'immutable';
import Input from './input-autocomplete';
import { Colors } from '../style';
import UserCard from './user-card';
import { User } from '../reducers/user';
import LabelsFilter from './labels-filter';
import { FILTER_KEYS } from '../constants/filters';
import { remove, add, replace, reset } from '../actions/filters';

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

  };

  public render() {
    const { languages, user, filters } = this.props;

    return (
      <div style={styles.container}>
        <UserCard user={user}/>
        <div style={styles.filterTitle}>
          Filters
        </div>
        <div style={styles.section}>
          <h3>Languages</h3>
          <Input
            onSelect={this.onSelectLanguage}
            style={styles.languageFilter}
            list={languages}/>
         </div>
        <div style={styles.section}>
          <h3>Labels</h3>
          <LabelsFilter
            selected={filters.get(labels)}
            labels={this.props.labels}
            onToggleTag={this.onToggleTag}/>
        </div>
        <div style={styles.section}>
          <h3>Period</h3>
          <Input
            onSelect={this.onSelectPeriod}
            style={styles.languageFilter}
            list={Set<string>()}/>
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
