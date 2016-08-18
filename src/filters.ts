import { FILTER_KEYS } from './constants/filters';

const [ languages, period, labels, withIssues, withoutAssignee ] = FILTER_KEYS;

export function applyRepositoryFilters(filters) {
  return repository => {

    // Language filter
    if (
      filters.get(languages).size > 0 &&
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
