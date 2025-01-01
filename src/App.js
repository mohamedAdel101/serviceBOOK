import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
 
    return (
        <Router>
            <div>
                <h1>Payment Management</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/add">Add Payment</Link>
                    <Link to="/search">Search Book</Link>
                </nav>
                <Routes>
                    
                </Routes>
            </div>
        </Router>
    );
};

export default App;