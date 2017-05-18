# tut_react_05BlogGrommet
The Blog from Section 6 of the Udemy training using Grommet and removing all additional npm libraries such as:
  - axios - for easy REST communication
  - react-promise - for easy/comfortable promise handling
  - redux-form - for easy/comfortable form handling


## **Pre-requisites**
  - npm / NodeJS
  - Python
  - Git

## **Several Commands**

#### __[A]__ *Get newest package.json provided by Grommet´s sample app*
  **IMPORTNANT:** Update the file only e.g. once a month to check for updates and eventually fix some occuring build problems.

  Always using the predefined package.json from Grommet Community and never adding other npm libraries will ensure better support by the Grommet Community because we are only using the "core libraries" recommended by Grommet.
  Yes, there are many libraries that would ease for example form-handling or requests, but with them we spread our points of failure and have no single point of contact: Grommet Community.

  The Grommet Sample app on Github: https://github.com/grommet/grommet-sample

    mkdir tmp
    cd tmp
    git clone https://github.com/grommet/grommet-sample.git
    vim grommet-sample/package.json

  ...now e.g. the new *package.json* can replace the current one in the project.

  **IMPORTANT:** Then a test of all functionality is necessary. Often updated libraries have changed methods and so on.


#### __[B]__ *Install node_modules from package.json*
  Install or update the packages named in the current package.json

    cd <ProjectDir>/
    npm install


#### __[C]__ *Build the source for deployment on an AS*
  Only needed if the Frontend should be provided by an explicit AS.

    cd <ProjectDir>
    npm run dist


#### __[D]__ *Run Frontend and npm´s ExpressJS Backend API*
  Here Gromment Frontend and Backend is implemented in JavaScript and watches for changes.
  If a change is done webpack will build the new frontend or the backend server will be restarted.

  1. first terminal starting the frontend:
          cd <ProjectDir>/src
          npm run dev
  2. edit the Backend endpoint to be used
          vim <ProjectDir>/src/src/js/actions/index.js
      use:
          const ROOT_URL = 'http://localhost:8080/api';
          // ExpressJS API --> /server
  3. second terminal starting the backend:
          cd <ProjectDir>/src
          npm run dev-server  
  ...now open http://localhost:3000 and browse in development environment using ExpressJS Backend on Port 8080


#### __[E]__ *Run Frontend and python flask Backend API*
  Here the Grommet Frontend is implemented in JavaScript and the Backend in Python. Now only changes in the Frontend are watched triggering a rebuild. If changes in the Backend are done, the

  1. first terminal starting the frontend:
          cd <ProjectDir>/src
          npm run dev
  2. edit the Backend endpoint to be used
          vim <ProjectDir>/src/src/js/actions/index.js
      use:
          const ROOT_URL = 'http://localhost:4000/api';
          // Python API --> /server-python
  3. second terminal starting the backend:
          cd <ProjectDir>/src
          PYTHONPATH=<Path_to_Python_Script>/server-python-apache/ twistd -n web --port 4000 --wsgi tut_rest_api.app
  ...now open http://localhost:3000 and browse in development environment using Python Backend on Port 4000


## **Main concepts and wording**
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


## **File structure**
    - dist            = all frontend files for deployment
    - dist-server     = [optional] all NodeJS/npm backend files, if present and used with npm AS
    - node-modules    = all libraries mentioned in the package.json
    - public          = index.html and images for the frontend (will be used when dist folder will be created)
    - server          = [optional] configuration of NodeJS/npm development and production server
    - server-python   = Python implementation of the Blog API
    - src             = source code of front-end
      - js            = all JavaScript code
        - actions     = Functions that Event-Handler will trigger.
                        Return a "Action" with structure { type: ADD_ITEM, payload: data } to the reducers
        - components  = all ReactJS components/containers that build up the GUI appearance
        - reducers    = Reducers get action objects from actions and select further data processing accordung to the action.type
        - App.js      = Connects the routes, store and internationalization
        - index.js    = Starting point where React "App" component and scss are connected to the index.html by assigning it to the DOM element.
        - routes.js   = Defintiion of the front-end routes for react-router.
        - store.js    = Connects the reducers (data handlers) with the middleware (here redux-thunk) that process actions to the reducers.
      - scss          = CSS provdided and managed by Grommet via theme (hpe, vanilla, ...)
    - .babelrc        =
    - .editorconfig   =
    - .eslintignore   =
    - .eslintrc       =
    - .gitignore      = Ignore files/folders of Git
    - .sass-lint.yml  =
    - package.json    = contains list of dependent packages for the Grommet ReactJS app
    - webpack.config.babel.js =
