import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { User } from '../reducers/user';
import { postTag } from '../actions/tags';
import { Tag } from '../reducers/tags';
import NavigationBar from '../components/navigation-bar';
import ToolBar from '../components/toolbar';
import ListMenu from '../components/list-menu';
import { Map, List } from 'immutable';

interface MainProps {
  location?: any;
  user: User;
  filters: Map<string, any>;
  registeredRepos: Map<string, any>;
  postTag: any;
  tags: Map<string, Tag>;
};

const styles = {
  listWrapper: {
    display: 'flex'
  },
  listContent: {
    flex: 1
  }
};

class ListView extends React.Component<MainProps, any> {

  public state = {
    selected: this.props.tags.first() && this.props.tags.first().get('id')
  };

  private onSelectTag = (key) => {
    this.setState({ selected: key });
  }

  public render() {
    const { location, user, filters, postTag, tags, registeredRepos } = this.props;
    const reposToDisplay = registeredRepos.filter(rr => rr.get('tags', List()).contains(this.state.selected));

    return (
      <div>
        <NavigationBar
          user={user}
          location={location}/>
        <div style={styles.listWrapper}>
          <div style={styles.listContent}>
            <ListMenu postTag={postTag} tags={tags} onSelectTag={this.onSelectTag}/>
            {
              reposToDisplay.map(rr =>
                rr.get('id')
              )
            }
          </div>
          <ToolBar
            filters={filters}/>
        </div>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  user: state.get('user'),
  filters: state.get('filters'),
  registeredRepos: state.get('registeredRepositories'),
  tags: state.get('tag')
}), (dispatch) => ({
  postTag: bindActionCreators(postTag, dispatch)
}))(ListView);
