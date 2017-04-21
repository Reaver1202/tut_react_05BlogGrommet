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
      //try to fetchPosts
      /*
        1. take id from URL
        2. fetchPost makes the backend request for this specific Post
        3. reduce/ picks up data
        4. maked sure the we can show the post inside of here
      */
      this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    // call action creator imported above
    this.props.deletePost(this.props.params.id)
      .then( () => {
        this.context.router.push('/');
      });
  }



  render() {
    const { post } = this.props;

    //console.log(post); // you see, that there is first a null and then the content: 1st render without data, 2nd render when request has been sent
    // AJAX Spinner
    if (!post){
      return <div>Loading... </div>
    };

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

PostsShow.contextTypes = {
  router: PropTypes.object // now this.context.router is available
};

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, {fetchPost, deletePost })(PostsShow);
