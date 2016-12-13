import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { User } from '../reducers/user';
import { getAllTags, postTag } from '../actions/tags';
import { Tag } from '../reducers/tags';
import NavigationBar from '../components/navigation-bar';
import ToolBar from '../components/toolbar';
import ListMenu from '../components/list-menu';

interface MainProps {
  location?: any;
  user: User;
  filters: Map<string, any>;
  getAllTags: any;
  postTag: any;
  tags: Map<string, Tag>
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

  public componentWillMount() {
    this.props.getAllTags();
  }

  public render() {
    const { location, user, filters, postTag, tags } = this.props;

    return (
      <div>
        <NavigationBar
          user={user}
          location={location}/>
        <div style={styles.listWrapper}>
          <div style={styles.listContent}>
            <ListMenu postTag={postTag} tags={tags}/>
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
  tags: state.get('tag')
}), (dispatch) => ({
  getAllTags: bindActionCreators(getAllTags, dispatch),
  postTag: bindActionCreators(postTag, dispatch),
}))(ListView);
