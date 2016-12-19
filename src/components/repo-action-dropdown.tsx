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
    focused: false,
    addList: false
  };

  private onFocus = () => {
    this.setState({
      focused: !this.state.focused
    });
  };

  private toggleAddList = () => {
    this.setState({
      addList: !this.state.addList
    });
  };

  private handleTagAddedToRepo(tag) {
    const { registeredRepoId, addTagToRepo, repo, createRepoAddTag } = this.props;

    if (registeredRepoId) {
      addTagToRepo(registeredRepoId, tag.get('id'));
    } else {
      createRepoAddTag(repo, tag.get('id'));
    }
  }

  public render() {
    const { tags } = this.props;
    const { focused, addList } = this.state;

    return (
        <div style={styles.wrapper}>
          <img style={styles.arrow} src="/assets/arrow.svg" onClick={this.onFocus}/>
          {
            focused && (
              <ul style={styles.list}>
                <li className={css(enhancedStyle.item)} onClick={this.toggleAddList}>Add to list</li>
                {
                  addList && (
                    <ul>
                      {
                        tags.map((tag, index) =>
                          <li key={index} onClick={this.handleTagAddedToRepo.bind(this, tag)}>{ tag.get('name') }</li>
                        ).toArray()
                      }
                    </ul>
                  )
                }
              </ul>
            )
          }
        </div>
    );
  }
}

export default RepoActionsDropdown;
