import * as React from 'react';
import { connect } from 'react-redux';
import { Set, Map } from 'immutable';
import Input from './input-autocomplete';
import { Colors } from '../style';
import LabelsFilter from './labels-filter';
import { FILTER_KEYS, pOptions, languageDefaultOption } from '../constants/filters';
import { remove, add, replace, reset, resetAll } from '../actions/filters';
import { Check } from './check';
import { RawButton } from './raw-button';

const [ languages, period, labels, withIssues, withoutAssignee ] = FILTER_KEYS;

interface MainProps {
  languages: Set<string>;
  labels: any;
  filters: Map<string, any>;
  dispatch: any;
  remove: any;
  add: any;
  replace: any;
  reset: any;
  resetAll: any;
};

const styles = {
  container: {
    borderRadius: '5px 5px 0px 0px',
    maxWidth: 360,
    flex: 3,
    marginTop: 40,
    paddingRight: 40,
    minHeight: '100vh'
  },
  languageFilter: {},
  filterTitle: {
    color: Colors.lightGrey,
    padding: '10px 0px',
    marginLeft: 20,
    fontSize: 14,
    borderBottom: `1px solid ${Colors.borderGrey}`
  },
  section: {
    padding: '10px 20px'
  },
  checkSection: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  defaultFilters: {
    color: Colors.red
  },
  defaultSection: {
    margin: '0px 20px',
    marginTop: 20,
    padding: '20px 0px',
    borderTop: `1px solid ${Colors.borderGrey}`,
    maxWidth: 100
  }
};

const periodOptions = Set<string>(pOptions);

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
    const { reset, replace, dispatch } = this.props;

    if (!language) {
      reset(languages)(dispatch);
    } else {
      replace(languages, language)(dispatch);
    }
  };

  private onSelectPeriod = time => {
    const { reset, replace, dispatch } = this.props;

    if (!time) {
      reset(period)(dispatch);
    } else {
      replace(period, time)(dispatch);
    }
  };

  private onToggleAssignee = val => {
    const { replace, dispatch } = this.props;

    replace(withoutAssignee, !val)(dispatch);
  };

  private onToggleIssues = val => {
    const { replace, dispatch } = this.props;

    replace(withIssues, !val)(dispatch);
  };

  private onResetFilters = () => {
    const { resetAll, dispatch } = this.props;
    resetAll()(dispatch);
  };

  public render() {
    const { filters } = this.props;

    return (
      <div style={styles.container}>
        <h3 style={styles.filterTitle}>
          Filters
        </h3>
        <div style={styles.section}>
          <h3>Updated before</h3>
          <Input
            onSelect={this.onSelectPeriod}
            selectedIndex={filters.get('period').first() || pOptions[0]}
            style={styles.languageFilter}
            list={periodOptions}/>
        </div>
        <div style={styles.section}>
          <h3>Languages</h3>
          <Input
            onSelect={this.onSelectLanguage}
            selectedIndex={filters.get('languages').first() || languageDefaultOption}
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
            <h3>With open issues</h3>
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

        <div style={styles.defaultSection}>
          <RawButton
            style={styles.defaultFilters}
            onClick={this.onResetFilters}>
            Default filters
          </RawButton>
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
      .push(languageDefaultOption)
      .filter(Boolean)
  )
}), dispatch => ({
  dispatch,
  remove,
  add,
  replace,
  reset,
  resetAll
}))(Toolbar);
