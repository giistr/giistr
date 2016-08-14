import * as React from 'react';
import { Set, List } from 'immutable';

const styles = {
  container: {
    position: 'relative'
  },
  input: {
    lineHeight: '40px',
    padding: '0px 10px',
    boxSizing: 'border-box',
    fontSize: 14,
    outline: 'none',
    width: '100%'
  },
  listContainer: {
    padding: '0px 10px',
    border: '1px solid grey',
    maxHeight: 200,
    overflow: 'auto',
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white'
  },
  cross: {
    position: 'absolute',
    backgroundColor: 'black',
    cursor: 'pointer',
    right: 10,
    top: 10,
    width: 20,
    height: 20
  },
  listItem: {
    padding: 10,
    cursor: 'pointer'
  }
};

interface MainProps {
  onChange?: Function;
  onSelect?: Function;
  onFocus?: Function;
  style?: Object;
  placeholder?: string;
  list: Set<string>
};


class Input extends React.Component<MainProps, any> {

  state = {
    focus: false,
    selectedIndex: undefined
  };

  refs: {
    [string: string]: any;
    container: any;
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = (e) => {
    const domNode = this.refs.container;
    if (!domNode || !domNode.contains(e.target)) {
      this.setState({ focus: false });
    }
  };

  _onChange = (...args) => {
    const { onChange } = this.props;
    if(typeof onChange === 'function') onChange(...args);
  };

  _onFocus = (...args) => {
    const { onFocus } = this.props;
    if(typeof onFocus === 'function') onFocus(...args);

    this.setState({ focus: true })
  };

  _onChangeSelect(index) {
    const { onSelect } = this.props;

    this.setState({
      selectedIndex: index,
      focus: false
    });

    if(typeof onSelect === 'function') {
      onSelect(index);
    }
  }

  render() {
    const { placeholder, style, list } = this.props;
    const { focus, selectedIndex } = this.state;

    return (
      <div style={Object.assign({}, styles.container, style)} ref="container">
        <input
          type='text'
          value={selectedIndex ? list.get(selectedIndex) : ''}
          style={styles.input}
          onFocus={this._onFocus}
          onChange={this._onChange}
          placeholder={placeholder}/>
        {
          selectedIndex !== undefined && (
            <div style={styles.cross} onClick={this._onChangeSelect.bind(this, undefined)}></div>
          )
        }
        {
          list && focus && selectedIndex === undefined && (
            <ul style={styles.listContainer}>
            {
              list.map((el, index) => (
                <li
                  key={index}
                  style={styles.listItem}
                  onClick={this._onChangeSelect.bind(this, index)}>
                  { el }
                </li>
              ))
            }
            </ul>
          )
        }
      </div>
    )
  }
}

export default Input;
