import { FILTER_KEYS } from './constants/filters';

const [ languages, period, labels, withIssues, withoutAssignee ] = FILTER_KEYS;

export function applyRepositoryFilters(filters) {
  return repository => {
    const res = true;

    if (
      filters.get(languages).size > 0 &&
      repository.get("language") !== filters.get(languages).first()
    ) {
      return false;
    }

    if(filters.get(withIssues) === true && repository.get('open_issues') === 0) {
      return false;
    }

    return true;
  };
}

export function applyIssueFilters(filters) {
  return issue => {

    if (filters.get(withoutAssignee) === true && issue.get('assignees').size > 0) {
      return false;
    }

    return true;
  };
}
