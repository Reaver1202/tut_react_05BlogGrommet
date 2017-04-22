import React, { Component } from 'react';
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';


export default class Main extends Component {
  render() {
    // we cann add now Header, Footer, ... and place the children (Rotue Childs) where we want
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
