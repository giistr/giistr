import * as React from 'react';
import { Set } from 'immutable';
import { Colors } from '../style';

const styles = {
  container: {
    position: 'relative',
    display: 'inline-block'
  },
  input: {
    lineHeight: '40px',
    padding: '0px 10px',
    boxSizing: 'border-box',
    fontSize: 14,
    outline: 'none',
    width: '100%',
    border: 'none',
    borderBottom: `1px solid ${Colors.borderGrey}`,
    color: Colors.grey
  },
  listContainer: {
    padding: '0px 10px',
    border: `1px solid ${Colors.borderGrey}`,
    maxHeight: 200,
    overflow: 'auto',
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    marginTop: 5,
    color: Colors.grey,
    zIndex: 1,
    borderRadius: 5
  },
  cross: {
    position: 'absolute',
    cursor: 'pointer',
    right: 10,
    top: 14,
    width: 14,
    height: 14
  },
  listItem: {
    padding: 10,
    cursor: 'pointer',
    fontSize: 14
  }
};

interface MainProps {
  onChange?: Function;
  onSelect?: Function;
  onFocus?: Function;
  style?: Object;
  placeholder?: string;
  selectedIndex?: string;
  list: Set<string>;
};

class Input extends React.Component<MainProps, any> {

  public state = {
    focus: false
  };

  public refs: {
    [T: string]: any;
    container: any;
  };

  public componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  private handleClickOutside = (e) => {
    const domNode = this.refs.container;
    if (!domNode || !domNode.contains(e.target)) {
      this.setState({ focus: false });
    }
  };

  private onChange = (...args) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(...args);
    }
  };

  private onFocus = (...args) => {
    const { onFocus } = this.props;
    if (typeof onFocus === 'function') {
      onFocus(...args);
    }

    this.setState({ focus: true });
  };

  private onChangeSelect(index) {
    const { onSelect } = this.props;

    this.setState({
      focus: false
    });

    if (typeof onSelect === 'function') {
      onSelect(index);
    }
  }

  public render() {
    const { placeholder, style, list, selectedIndex } = this.props;
    const { focus } = this.state;

    return (
      <div style={Object.assign({}, styles.container, style)} ref="container">
        <input
          type="text"
          value={selectedIndex ? list.get(selectedIndex) : ''}
          style={styles.input}
          onFocus={this.onFocus}
          onChange={this.onChange}
          placeholder={placeholder}/>
        <img style={styles.cross} src="/assets/arrow.svg" onClick={this.onFocus}/>
        {
          list && focus && (
            <ul style={styles.listContainer}>
            {
              list.map((el, index) => (
                <li
                  key={index}
                  style={styles.listItem}
                  onClick={this.onChangeSelect.bind(this, index)}>
                  { el }
                </li>
              ))
            }
            </ul>
          )
        }
      </div>
    );
  }
}

export default Input;
