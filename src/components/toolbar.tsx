import * as React from 'react';
import { Set, List } from 'immutable';
import Input from './input-autocomplete';
import { Colors } from '../style';
import UserCard from './user-card';
import { User } from '../reducers/user';
import LabelsFilter from './labels-filter';

interface MainProps {
  onSelectLanguage: Function;
  onSelectPeriod: Function;
  languages: Set<string>;
  user: User;
};

const styles = {
  container: {
    backgroundColor: 'white',
    flex: 3,
    borderLeft: `1px solid ${Colors.borderGrey}`
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
  public render() {
    const { languages, onSelectLanguage, onSelectPeriod, user } = this.props;

    return (
      <div style={styles.container}>
        <UserCard user={user}/>
        <div style={styles.filterTitle}>
          Filters
        </div>
        <div style={styles.section}>
          <h3>Languages</h3>
          <Input
            onSelect={onSelectLanguage}
            style={styles.languageFilter}
            list={languages}/>
         </div>
        <div style={styles.section}>
          <h3>Labels</h3>
          <LabelsFilter/>
        </div>
        <div style={styles.section}>
          <h3>Period</h3>
          <Input
            onSelect={onSelectPeriod}
            style={styles.languageFilter}
            list={Set<string>()}/>
        </div>
      </div>
    );
  }
}

export default Toolbar;
