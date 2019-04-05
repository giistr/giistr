import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Set, Map } from 'immutable';
import Input from './input-autocomplete';
import InputText from './input-text';
import { Colors } from '../style';
import LabelsFilter from './labels-filter';
import {
  FILTER_KEYS,
  pOptions,
  languageDefaultOption
} from '../constants/filters';
import { remove, add, replace, reset, resetAll } from '../actions/filters';
import { Check } from './check';
import { RawButton } from './raw-button';

const [
  languages,
  period,
  labels,
  withIssues,
  withoutAssignee,
  searchIssue
] = FILTER_KEYS;

interface MainProps {
  languages: Set<string>;
  labels: any;
  filters: any;
  remove: any;
  add: any;
  replace: any;
  reset: any;
  resetAll: any;
}

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
    paddingBottom: 10,
    marginLeft: 20,
    fontSize: 14
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
    const { filters, remove, add } = this.props;

    if (filters.get(labels).includes(id)) {
      remove(labels, id);
    } else {
      add(labels, id);
    }
  };

  private onSearchIssue = evt => {
    const { replace } = this.props;
    replace(searchIssue, evt.target.value);
  };

  private onSelectLanguage = language => {
    const { reset, replace } = this.props;

    if (!language) {
      reset(languages);
    } else {
      replace(languages, language);
    }
  };

  private onSelectPeriod = time => {
    const { reset, replace } = this.props;

    if (!time) {
      reset(period);
    } else {
      replace(period, time);
    }
  };

  private onToggleAssignee = val => {
    const { replace } = this.props;
    replace(withoutAssignee, !val);
  };

  private onToggleIssues = val => {
    const { replace } = this.props;
    replace(withIssues, !val);
  };

  private onResetFilters = () => {
    const { resetAll } = this.props;
    resetAll();
  };

  public render() {
    const { filters } = this.props;

    return (
      <div style={styles.container}>
        <h3 style={styles.filterTitle}>Filters</h3>
        <div style={styles.section}>
          <InputText
            onChange={this.onSearchIssue}
            placeholder="Search on issues"
          />
        </div>
        <div style={styles.section}>
          <h3>Updated before</h3>
          <Input
            onSelect={this.onSelectPeriod}
            selectedIndex={filters.get('period').first() || pOptions[0]}
            style={styles.languageFilter}
            list={periodOptions}
          />
        </div>
        <div style={styles.section}>
          <h3>Languages</h3>
          <Input
            onSelect={this.onSelectLanguage}
            selectedIndex={
              filters.get('languages').first() || languageDefaultOption
            }
            style={styles.languageFilter}
            list={this.props.languages}
          />
        </div>
        <div style={Object.assign({}, styles.section, styles.checkSection)}>
          <div>
            <h3>Without assignees</h3>
            <Check
              onSelect={this.onToggleAssignee.bind(
                this,
                filters.get(withoutAssignee)
              )}
              inactive={!filters.get(withoutAssignee)}
            />
          </div>
          <div>
            <h3>With open issues</h3>
            <Check
              onSelect={this.onToggleIssues.bind(this, filters.get(withIssues))}
              inactive={!filters.get(withIssues)}
            />
          </div>
        </div>
        <div style={styles.section}>
          <h3>Labels</h3>
          <LabelsFilter
            selected={filters.get(labels)}
            labels={this.props.labels}
            onToggleTag={this.onToggleTag}
          />
        </div>

        <div style={styles.defaultSection}>
          <RawButton
            style={styles.defaultFilters}
            onClick={this.onResetFilters}
          >
            Default filters
          </RawButton>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    labels: state.label,
    languages: Set<string>(
      state.repository
        .map(repo => repo.get('language'))
        .toList()
        .push(languageDefaultOption)
        .filter(Boolean)
    )
  }),
  dispatch => ({
    remove: bindActionCreators(remove, dispatch),
    add: bindActionCreators(add, dispatch),
    replace: bindActionCreators(replace, dispatch),
    reset: bindActionCreators(reset, dispatch),
    resetAll: bindActionCreators(resetAll, dispatch)
  })
)(Toolbar);
