import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
import Footer from 'grommet/components/Footer';

class PostsNew extends Component {
  constructor () {
    super();

    //TODO
    console.log(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    //TODO
    console.log(this);

    this.state = {
      fields: {
        title: '',
        categories: '',
        content: ''
      },
      blaa: "blaa"
    };

  }



  /* One InputChange handler for all input elements. One update with setState (current + updated field)
    val = value from event of form input element
    key = string that indicates which input element has triggered the event
  */
  _onInputChange(val, key) {
    let title = this.state.fields.title;
    let categories = this.state.fields.categories;
    let content = this.state.fields.content;

    switch (key){
      case "title": title = val; break;
      case "categories": categories = val; break;
      case "content": content = val; break;
      default: console.log("no known element type");
    }
    // ...this.state = take current state
    // and add fields (or update if already existing --> yes)
    this.setState({...this.state, fields: {title, categories, content}} );
  }



  _onSubmit(event) {
    event.preventDefault();
    // props = properties from the form
    console.log(event);
    console.log(this.state.fields);

    // creates a promise as a payload => whenever this,
    this.props.createPost(this.state.fields)
      // chain on a "then"-Statement
      .then( () => {
        // blog post has been created, navigate the user to the index
        // We navigateby calling this.context.router.push with the new path to navigate to.
        this.context.router.push('/');

      });
  }

  render() {
    // ES6 syntax
   const { title, categories, content  } = this.state.fields;
    /* same as (ES5):
      const title = this.state.fields.title;
      const categories = this.state.fields.categories;
      const content = this.state.fields.content;
    */


    return (
      <Form onSubmit={this._onSubmit}>
        <Heading tag={'h3'}>Create A New Post</Heading>

        <Box>
          <FormField label={"Title"}  htmlFor={"newPost_title"}  >
            <input type='text' id="newPost_title" value={title} onChange={ (event) => this._onInputChange(event.target.value, "title") } />
          </FormField>
        </Box>

        <Box>
          <FormField label={"Categories"}  htmlFor={"newPost_category"}>
            <input type='text' id="newPost_category" value={categories} onChange={ (event) => this._onInputChange(event.target.value, "categories") } />
          </FormField>
        </Box>

        <Box>
          <FormField label={"Content"}  htmlFor={"newPost_content"} >
            <input type='text' id="newPost_content" value={content} onChange={ (event) => this._onInputChange(event.target.value, "content") } />
          </FormField>
        </Box>
        <Footer>
          <Button type="submit" label={"Submit"} primary={true} onClick={this._onSubmit}/>
          <Button path={"/"} label={"Cancel"} />
        </Footer>
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
// function validate(values){
//   const errors = {};
//
//   if (!values.title) {
//     errors.title = 'Enter a title';
//   }
//   if (!values.categories){
//     errors.categories = 'Enter categories [comma separated e.g.: a, b, c]'
//   }
//   if (!values.content){
//     errors.content = 'Enter some content';
//   }
//
//   // when errors return with one of the defined form properties below
//   // (title, categories, content)
//   return errors;
// }


// connect: 1st arg = mapStateToProps, 2nd = mapDispatchToProps
export default connect( null, { createPost } )(PostsNew);
