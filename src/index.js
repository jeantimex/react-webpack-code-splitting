import React from 'react';
import { render } from 'react-dom';
import Root from './root'; // import Root that we just created

// rendering the Root component into <div id="App"></div>
render(
  <Root />,
  document.getElementById('App')
);