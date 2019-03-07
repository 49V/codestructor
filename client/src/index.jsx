// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import App from './App.jsx';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';

const routing = (
  <CookiesProvider>
    <Router>
      <App />
    </Router>
  </CookiesProvider>
)

ReactDOM.render(routing, document.getElementById('react-root'));