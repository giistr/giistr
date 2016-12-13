import * as React from 'react';
import AddListControl from './add-list-control';

class ListMenu extends React.Component<any, null> {
  public render() {
    console.log(this.props.tags);

    return (
      <div>
        <AddListControl postTag={this.props.postTag}/>
        {
          this.props.tags.map((tag, key) => (
            <div key={key}>
              { tag.get('name') }
            </div>
          )).toArray()
        }
      </div>
    );
  }
}

export default ListMenu;
