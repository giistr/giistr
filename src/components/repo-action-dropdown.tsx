import * as React from 'react';
import { Colors } from '../style';
import { StyleSheet, css } from 'aphrodite/no-important';

const styles = {
  wrapper: {
    position: 'relative'
  },
  arrow: {
    cursor: 'pointer',
    padding: 5
  },
  list: {
    position: 'absolute',
    top: 20,
    left: -120,
    textAlign: 'right',
    width: 140,
    backgroundColor: 'white',
    border: `1px solid ${Colors.borderGrey}`,
    borderRadius: 5,
    fontSize: 14,
    color: Colors.lightGrey,
    padding: '4px 0px'
  }
};

const enhancedStyle = StyleSheet.create({
  item: {
    padding: 6,
    cursor: 'pointer',
    ':hover': {
      color: Colors.middleGrey
    }
  }
});

class RepoActionsDropdown extends React.Component<any, any> {

  public state = {
    focused: false
  };

  private onFocus = () => {
    this.setState({
      focused: !this.state.focused
    });
  };

  public render() {
    return (
        <div style={styles.wrapper}>
          <img style={styles.arrow} src="/assets/arrow.svg" onClick={this.onFocus}/>
          {
            this.state.focused && (
              <ul style={styles.list}>
                <li className={css(enhancedStyle.item)}>Add to list</li>
              </ul>
            )
          }
        </div>
    );
  }
}

export default RepoActionsDropdown;
