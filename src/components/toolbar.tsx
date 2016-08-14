import * as React from 'react';
import { Set } from 'immutable';
import Input from './input-autocomplete';

interface MainProps {
  onClear: Function;
  onNext: Function;
  onGetAll: Function;
  onSelectLanguage: Function;
  languages: Set<string>;
};

const styles = {
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 2
  },
  languageFilter: {}
};

class Toolbar extends React.Component<MainProps, any> {
  public render() {
    const { onClear, onNext, languages, onSelectLanguage, onGetAll } = this.props;

    return (
      <div style={styles.container}>
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

export default Toolbar;
