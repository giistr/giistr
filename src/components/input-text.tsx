import * as React from 'react';
import { Colors } from '../style';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    borderBottom: `1px solid ${Colors.borderGrey}`,
    alignItems: 'center'
  },
  input: {
    lineHeight: '40px',
    padding: '0px 10px',
    boxSizing: 'border-box',
    fontSize: 12,
    outline: 'none',
    width: '100%',
    border: 'none',
    color: Colors.middleGrey,
    backgroundColor: 'transparent'
  },
  cross: {
    cursor: 'pointer',
    width: 14,
    height: 14
  }
};

interface MainProps {
  onChange?: Function;
  style?: Object;
  placeholder?: string;
}

class Input extends React.Component<MainProps, any> {
  private onChange = (...args) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(...args);
    }
  };

  public render() {
    const { placeholder, style } = this.props;

    return (
      <div style={Object.assign({}, styles.container, style)} ref="container">
        <img style={styles.cross} src="/assets/search.svg" />
        <input
          type="text"
          style={styles.input}
          onChange={this.onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default Input;
