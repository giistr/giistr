import * as React from 'react';
import { Set } from 'immutable';
import Input from './input-autocomplete';

interface MainProps {
  onGetRepository: Function;
  onUserQuery: Function;
  onClear: Function;
  onNext: Function;
  onSelectLanguage: Function;
  languages: Set<string>;
};

const styles = {
  container: {
    padding: 10,
    position: 'fixed',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    top: 0,
    height: 100
  },
  languageFilter: {
    display: 'inline-block'
  }
};

class Issues extends React.Component<MainProps, any> {
  public render() {
    const { onGetRepository, onUserQuery, onClear, onNext, languages, onSelectLanguage } = this.props;

    return (
      <div style={styles.container}>
        <input type="text" placeholder="Enter github user account" onChange={onUserQuery}/>
        <button onClick={onGetRepository}>Search</button>
        <button onClick={onClear}>clear</button>
        <button onClick={onNext}>More</button>
        <Input
          onSelect={onSelectLanguage}
          style={styles.languageFilter}
          list={languages}/>
      </div>
    )
  }
}

export default Issues;
