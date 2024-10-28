import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home'; // Import Home component
import App from './App'; // Import App component

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  
      <Route path="/app" element={<App />} /> 
    </Routes>
  );
};

export default AppRouter;
