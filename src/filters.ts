import { FILTER_KEYS, pOptions, languageDefaultOption } from './constants/filters';
import * as moment from 'moment';

const [ languages, period, labels, withIssues, withoutAssignee ] = FILTER_KEYS;

function periodInterpretation(option) {
  switch (option) {
    case pOptions[1]:
      return moment().subtract(5, 'days').unix();

    case pOptions[2]:
      return moment().subtract(30, 'days').unix();

    case pOptions[3]:
      return moment().subtract(2, 'months').unix();

    case pOptions[4]:
      return moment().subtract(1, 'year').unix();
    default:
      return 0;
  }
}

export function applyRepositoryFilters(filters) {
  return repository => {

    // Language filter
    if (
      filters.get(languages).size > 0 &&
      filters.get(languages).first() !== languageDefaultOption &&
      repository.get('language') !== filters.get(languages).first()
    ) {
      return false;
    }

    // With issues only filter
    if (filters.get(withIssues) === true && repository.get('open_issues') === 0) {
      return false;
    }

    return true;
  };
}

export function applyIssueFilters(filters) {
  return issue => {

    // Apply period filter
    if (
      filters.get(period).size > 0 &&
      filters.get(period).first() !== pOptions[0] &&
      moment(issue.get('updated_at')).unix() < periodInterpretation(filters.get(period).first())
    ) {
      return false;
    }

    // No assignees filter
    if (filters.get(withoutAssignee) === true && issue.get('assignees').size > 0) {
      return false;
    }

    // Labels filter
    if (
      filters.get(labels).size > 0 &&
      !issue.get('labelsIds').reduce((acc, next) => acc ? acc : filters.get(labels).includes(next), false)
    ) {
      return false;
    }

    return true;
  };
}
