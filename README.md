# tut_react_05BlogGrommet
The Blog from Section 6 of the Udemy training using Grommet and removing all additional npm libraries such as
- axios for easy REST communication
- react-promise for easy/comfortable promise handling
- redux-form for easy/comfortable form handling


## Main concepts and wording
- Component State: data only within a component and eventually it´s childs
- Application State: react-redux state managing data for the whole application using store.js and reducers/* and the connect-method
- component:
- container:
- ReactJS Lifecycle methods:
  - componentWillMount: called by React when component is about to be rendered for the first time, only!
- Processing: Click --> actions ---using promises--> reducers --updates the redux application state--> component properties
- <CompnentClass>.proptypes: definition of properties the component can
- promise
- action creator: /actions/* --> creates an action object that will be passed to the reducers
