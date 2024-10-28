import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './AppPage';  
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AppRouter />  
    </Router>
  </React.StrictMode>
);

reportWebVitals();
