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
  // constructor to bind specific method to "this" and to set the component state
  constructor () {
    super();

    // https://www.sitepoint.com/bind-javascripts-this-keyword-react/
    // binds the "this" from the component "PostsNew" to this function.
    // Now inside this function, e.g. this.setState() is possible
    this._onSubmit = this._onSubmit.bind(this);
    this._onInputChange = this._onInputChange.bind(this);

    // state with input data to have a controlled form
    this.state = {
      fields: {
        title: '',
        categories: '',
        content: ''
      },
      errors: {} // will only contain properties when errors occur
    };
  }



  /*
    One InputChange handler for all input elements. One update with setState (current + updated field)
    val = value from event of form input element
    key = string that indicates which input element has triggered the event
  */
  _onInputChange(val, key) {
    // take current state values
    let { title, categories, content } = this.state.fields;
    let { errors } = this.state;
    // select and update the changed type of value and remove errors if present
    switch (key){
      case "title": title = val; errors.title=undefined; break;
      case "categories": categories = val; errors.categories=undefined; break;
      case "content": content = val; errors.content=undefined; break;
      default: console.log("no known element type");
    }
    // add fields (or update if already existing --> yes)
    this.setState({fields: {title, categories, content}} );
  }


  /*
    Event handler to check and submit the form
  */
  _onSubmit(event) {
    event.preventDefault();
    console.log(this.state.fields);

    // check for errors
    let errors = {};
    let noErrors = true;
    if (!this.state.fields.title){
      errors.title = 'Please enter a title';
      noErrors = false;
    }
    if (!this.state.fields.categories){
      errors.categories = "Please enter a category";
      noErrors = false;
    }
    if (!this.state.fields.content){
      errors.content = "Please enter some content";
      noErrors = false;
    }

    if (noErrors){
      console.log("posts_new.js - noError")

      // run a action method from /actions/index.js to create a new post
      //TODO
      // --> action --> sends data --> returns a action object --> will be dispatech by middleware (thunk) and passed to all reducers
      // --> reducers --> updates application redux state --> data is available in this component via this.props.<ReducerVariable> (posts)
      let req= this.props.createPost(this.state.fields);
      console.log("posts_new.js - onSubmit - req")
      console.log(req);
      // chain on a "then"-Statement
      req.then( (response) => {
        console.log("posts_new.js - now then...")
        console.log(response) // the promise of {req: Object {...}, type: "CREATE_POST"}
        // blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the new path to navigate to.
        this.context.router.push('/');
      });
    } else {
      // errors will be displayed beneath the input fields
      this.setState({errors})
    }
  }

  render() {
    // ES6 syntax
   const { title, categories, content  } = this.state.fields;
   const { errors } = this.state;
    /* same as (ES5):
      const title = this.state.fields.title;
      const categories = this.state.fields.categories;
      const content = this.state.fields.content;
    */

    // renders a simple form
    return (
      <Form title="Create a new Blog Entry" onSubmit={this._onSubmit}>
        <Heading tag={'h3'}>Create A New Post</Heading>

        <Box>
          <FormField label={"Title"}  htmlFor={"newPost_title"}  error={errors.title}>
            <input type='text' id="newPost_title" value={title} onChange={ (event) => this._onInputChange(event.target.value, "title") } />
          </FormField>
        </Box>

        <Box>
          <FormField label={"Categories"}  htmlFor={"newPost_category"} error={errors.categories} >
            <input type='text' id="newPost_category" value={categories} onChange={ (event) => this._onInputChange(event.target.value, "categories") } />
          </FormField>
        </Box>

        <Box>
          <FormField label={"Content"}  htmlFor={"newPost_content"} error={errors.content} >
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
// React is then going to search all of this component´s parents until it finds a component that has a piece of context called router.
PostsNew.contextTypes = {
  router: PropTypes.object // now this.context.router is available
};

// connect: 1st arg = mapStateToProps, 2nd = mapDispatchToProps, then the component class
export default connect( null, { createPost } )(PostsNew);
