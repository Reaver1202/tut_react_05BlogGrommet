import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Paragraph from 'grommet/components/Paragraph';


class PostsShow extends Component {
  componentWillMount() {
      //try to fetchPost
      /*
        1. take id from URL
        2. fetchPost makes the backend request for this specific Post
        3. reduce / picks up data
        4. maked sure we can show the post inside of here
      */

      // run a action method from /actions/index.js to view a single post
      //TODO
      // --> action --> requests single data --> returns a action object --> will be dispatech by middleware (thunk) and passed to all reducers
      // --> reducers --> updates application redux state --> data is available in this component via this.props.<ReducerVariable> (posts.post)
      this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {

    // run a action method from /actions/index.js to create a new post
    //TODO
    // --> action --> sends data --> returns a action object --> will be dispatech by middleware (thunk) and passed to all reducers
    // --> reducers --> updates application redux state --> data is available in this component via this.props.<ReducerVariable> (posts)
    // a promise is returned to make a then-chain after the post was deleted
    this.props.deletePost(this.props.params.id)
      .then( () => {
        this.context.router.push('/');
      });
  }



  render() {
    const { post } = this.props;

    //console.log(post); // you see, that there is first a null and then the content: 1st render without data, 2nd render when request has been sent
    // AJAX Spinner to show loading as long as the data is not fully available
    if (!post){
      return <div>Loading... </div>
    };

    // renders a link back to the startpage, a button to delete the current blog post
    // and some components to display the requested blog post
    return (
      <Box margin={"small"}>
        <Link to="/">Back to Index</Link>
        <Button
          onClick={this.onDeleteClick.bind(this)}
          label={"Delete Post"}
          />
        <Heading tag={'h3'}>{post.title}</Heading>
        <Heading tag={'h6'}>Categories: {post.categories}</Heading>
        <Paragraph align={"start"} margin={"small"} size={"large"}>{post.content}</Paragraph>
      </Box>
    );
  }
}

// make router availble
PostsShow.contextTypes = {
  router: PropTypes.object // now this.context.router is available
};

// map a piece of the redux application state to the properties of the component´s properties
function mapStateToProps(state) {
  return { post: state.posts.post };
}
// connect the state/props and the action creators with the component
export default connect(mapStateToProps, {fetchPost, deletePost })(PostsShow);
