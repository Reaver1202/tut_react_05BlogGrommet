import React, { Component } from 'react';
import { connect } from 'react-redux';
// not needed because of the shortcuts below
//import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Button';

class PostsIndex extends Component {

// TODO Doku
// PostsIndex.proptypes { /* Properties die diese Component empfangen kann */}

  // React Lifecycle method
  // componentWillMount: called by React when component is about to be rendered for the first time, only!
  componentWillMount() {
    console.log("PostsIndex: componentWillMount")
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <ListItem key={post.id} justify='between'  >
          {post.categories}
          <Link to={"posts/" + post.id}><strong>{post.title}</strong></Link>
        </ListItem>
      );
    });
  }

  render() {
    console.log("PostsIndex: render")
    console.log(this.props.posts)

    return (
      <Box pad="small" separator="top">
        <Button label="Add a post" path="/posts/new" />
        <Box margin="small" separator="top">
          <Heading tag={'h3'}>Posts</Heading>
          <List>
            {this.renderPosts()}
          </List>
        </Box>
      </Box>
    );
  }
}


/* TODO explain
  - with connect below this method is used
  - it takes from redux state (state) the data
  - here all posts are now mapped to the posts property of props of this component
    --> now this.props.posts can be used
*/
function mapStateToProps(state) {
  return { posts: state.posts.all};
}

/* minimize code --> shortcut in connect function with "{ fetchPosts }"
  - TODO
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts },  dispatch);
}

// null --> no mapStateToProps method
export default connect(null, mapDispatchToProps)(PostsIndex);
*/

// use the mapDispatchToProps shortcut
//export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);
// now ES6 syntax to minimize more
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
