import * as React from 'react';
import { Set } from 'immutable';
import Input from './input-autocomplete';
import { Colors } from '../style';

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
    flex: 2,
    borderLeft: `1px solid ${Colors.borderGrey}`
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
