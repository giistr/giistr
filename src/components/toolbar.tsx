import * as React from 'react';
import { Set } from 'immutable';
import Input from './input-autocomplete';

interface MainProps {
  onGetRepository: Function;
  onUserQuery: Function;
  onClear: Function;
  onNext: Function;
  onGetAll: Function;
  onSelectLanguage: Function;
  languages: Set<string>;
};

const styles = {
  container: {
    backgroundColor: 'white',
    height: 100,
    left: 0,
    padding: 10,
    position: 'fixed',
    right: 0,
    top: 0
  },
  languageFilter: {
    display: 'inline-block'
  }
};

class Issues extends React.Component<MainProps, any> {
  public render() {
    const { onGetRepository, onUserQuery, onClear, onNext, languages, onSelectLanguage, onGetAll } = this.props;

    return (
      <div style={styles.container}>
        <input type="text" placeholder="Enter github user account" onChange={onUserQuery}/>
        <button onClick={onGetRepository}>Search</button>
        <button onClick={onClear}>clear</button>
        <button onClick={onNext}>More</button>
        <button onClick={onGetAll}>All</button>
        <Input
          onSelect={onSelectLanguage}
          style={styles.languageFilter}
          list={languages}/>
      </div>
    );
  }
}

export default Issues;
