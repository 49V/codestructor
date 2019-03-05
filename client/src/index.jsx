// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx';

const routing = (
  <Router>
    <App />
  </Router>
)

ReactDOM.render(routing, document.getElementById('react-root'));