import * as React from 'react';
import AddListControl from './add-list-control';

class ListMenu extends React.Component<any, null> {
  public render() {
    const { tags, onSelectTag, postTag } = this.props;

    return (
      <div>
        <AddListControl postTag={postTag}/>
        {
          tags.map((tag, key) => (
            <div key={key} onClick={() => onSelectTag(key)}>
              { tag.get('name') }
            </div>
          )).toArray()
        }
      </div>
    );
  }
}

export default ListMenu;
