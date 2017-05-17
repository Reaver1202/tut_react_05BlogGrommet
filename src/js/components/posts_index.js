import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Button from 'grommet/components/Button';

class PostsIndex extends Component {

  // React Lifecycle method
  // componentWillMount: called by React when component is about to be rendered for the first time, only!
  componentWillMount() {
    console.log("posts_index.js - componentWillMount")
    // run a action method from /actions/index.js to fetch all posts
    // --> action --> requests data --> returns a action object --> will be dispatech by middleware (thunk) and passed to all reducers
    // --> reducers --> updates application redux state --> data is available in this component via this.props.<ReducerVariable> (posts.all)
    this.props.fetchPosts();
  }

  /* Helper function to render all ListItems */
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
    console.log("posts_index.js - render")
    console.log(this.props.posts)

    // Just a Button to create a new post and a list with all available blog posts
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


/*
  - with connect below this method is used
  - it takes from redux state (state) the data
  - here all posts are now mapped to the posts property of props of this component
    --> now this.props.posts can be used
*/
function mapStateToProps(state) {
  return { posts: state.posts.all};
}

/* minimize code --> shortcut in connect function with "{ fetchPosts }"
  //import { bindActionCreators } from 'redux'; // needed for this
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts },  dispatch);
}
// null --> no mapStateToProps method
export default connect(null, mapDispatchToProps)(PostsIndex);
*/
// now ES6 syntax to minimize more
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
