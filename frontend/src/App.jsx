import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksPage from './components/BooksPage';
import BookForm from './components/BookForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BooksPage />} />
                <Route path="/add-book" element={<BookForm />} />
                <Route path="/update-book/:id" element={<BookForm />} />
            </Routes>
        </Router>
    );
};

export default App;
