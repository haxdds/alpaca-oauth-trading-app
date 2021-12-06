import Home from './Home';
// import About from './components/About';
// import Shop from './components/Shop';
import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard';

function App() {
    return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          
        </Routes>
    </Router>
    )
}

export default App