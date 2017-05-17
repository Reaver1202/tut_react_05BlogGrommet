/*
  - central component in that all other components are loaded via react-router
  - in routes.js Main is defined as parent component for the index-route /
  - and the this.props.children property contains the current component of the available nested routes
  --> index-route is PostsIndex => so Main will contain the content of PostsIndex when the Web Appl. is visited first
*/
import React, { Component } from 'react';
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';

export default class Main extends Component {
  render() {
    return (
      <App >
        <Title  >
          <Box>
            <Heading tag={'h1'} >Blog with Grommet </Heading>
          </Box>
        </Title>
        {this.props.children}
      </App>
    );
  }
}
