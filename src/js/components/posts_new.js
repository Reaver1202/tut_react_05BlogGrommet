import React, { Component, PropTypes } from 'react';
// similar to connect function from react-redux
// also wrap the PostsNew-Component in the export at the bottom
import { reduxForm } from 'redux-form'
// import action creator
import { createPost } from '../actions/index';
// navigate to other pages
import { Link } from 'react-router';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

class PostsNew extends Component {

  onSubmit(props) {
    // props = properties from the form

    // creates a promise as a payload => whenever this,
    this.props.createPost(props)
      // chain on a "then"-Statement
      .then( () => {
        // blog post has been created, navigate the user to the index
        // We navigateby calling this.context.router.push with the new path to navigate to.
        this.context.router.push('/');

      });
  }

  render() {

    // ES6 syntax
    const { fields: {title, categories, content }, handleSubmit } = this.props;
    /* same as (ES5):
      const handleSubmit = this.props.handleSubmit;
      const title = this.props.fields.title;
      const categories = this.props.fields.categories;
      const content = this.props.fields.content;
    */
    //console.log(title);

    // handleSubmit --> from redux-form
    // redux-form documentation

    return (
      <Form onSubmit={handleSubmit(this.onSubmit.bind(this) /* bind the context of our function here to "this" of the form */)  /* handleSubmit --> from redux-form */ }>
        <Heading tag={'h3'}>Create A New Post</Heading>

        <Box>
          <FormField label={"Title"}  htmleFor={"newPost_title"} error={"enter title"} >
            <TextInput id="newPost_title" />
          </FormField>
        </Box>

        <Box>
          <FormField label={"Categories"}  htmleFor={"newPost_category"} {...categories} >
            <TextInput id="newPost_category" />
          </FormField>
        </Box>

        <Box>
          <FormField label={"Content"}  htmleFor={"newPost_content"} {...content} >
            <TextInput id="newPost_content" />
          </FormField>
        </Box>

        <Button type={"submit"} label={"Submit"} />
        <Button path={"/"} label={"Cancel"} />

      </Form>
    );
  }
}

// context´s type property --> try to avoid using context! --> only for router as here
// defining an object of the PostsNew class
// get access on our context called  router
// React is then goining to search all of this component´s parents until it finds a component that has a piece of context called router.
PostsNew.contextTypes = {
  router: PropTypes.object // now this.context.router is available
};

// adds error properties to the defined form-properties e.g. title.error
function validate(values){
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories){
    errors.categories = 'Enter categories [comma separated e.g.: a, b, c]'
  }
  if (!values.content){
    errors.content = 'Enter some content';
  }

  // when errors return with one of the defined form properties below
  // (title, categories, content)
  return errors;
}


// connect: 1st arg = mapStateToProps, 2nd = mapDispatchToProps
// reduxForm: 1st = form config, 2nd = mapStateToProps, 3rd = mapDispatchToProps
export default reduxForm({
  // configuration to redux-form, letter we pass to reduxForm

  // unique token/name
  form: 'PostsNewForm',
  // watch for these inputs --> now this.props.fields.title
  fields: ['title', 'categories', 'content'],
  validate
/* behind the scenes
  - user types somethin in....record it on application state
  state === {
    form: {
      PostsNewForm: {
        title: '...',
        categories: '....',
        content: '...'
      }
    }
  }
  */
}, null, { createPost } )(PostsNew);
