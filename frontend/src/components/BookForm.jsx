import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookForm = () => {
    const [book, setBook] = useState({ id: '', name: '', description: '' });
    const [isEditMode, setIsEditMode] = useState(false);
    const [existingIds, setExistingIds] = useState([]);
    const [error, setError] = useState('');
    const { id } = useParams(); // Get ID from URL parameters
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all existing books to validate IDs
        axios.get('http://localhost:3000/books').then((response) => {
            setExistingIds(response.data.map((b) => b.id));
        });

        // Fetch the book details if in edit mode
        if (id) {
            setIsEditMode(true);
            axios
                .get(`http://localhost:3000/books/${id}`)
                .then((response) => {
                    setBook(response.data);
                })
                .catch((err) => {
                    console.error('Error fetching book details:', err.message);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate ID: Ensure it's unique if changed
        const newId = parseInt(book.id, 10);
        if (!isEditMode || newId !== parseInt(id, 10)) {
            if (existingIds.includes(newId)) {
                setError('ID already exists. Please use a unique ID.');
                return;
            }
        }

        // Validate Name and Description
        if (!book.name.trim() || !book.description.trim()) {
            setError('Name and description are required.');
            return;
        }

        try {
            setError('');
            if (isEditMode) {
                // Update the book
                await axios.put(`http://localhost:3000/books/${id}`, book);
            } else {
                // Create a new book
                await axios.post('http://localhost:3000/books', book);
            }
            navigate('/'); // Redirect back to the books page
        } catch (err) {
            setError(`Error: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>
                {isEditMode ? 'Update Book' : 'Add Book'}
            </h1>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Display the ID field */}
                <div>
                    <label htmlFor="id" style={{ fontWeight: 'bold', color: '#555' }}>ID:</label>
                    <input
                        type="number"
                        id="id"
                        value={book.id}
                        onChange={(e) => setBook({ ...book, id: e.target.value })}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            outline: 'none',
                            fontSize: '14px',
                        }}
                        min="0" // Prevent negative values
                    />
                </div>
                <div>
                    <label htmlFor="name" style={{ fontWeight: 'bold', color: '#555' }}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={book.name}
                        onChange={(e) => setBook({ ...book, name: e.target.value })}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            outline: 'none',
                            fontSize: '14px',
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="description" style={{ fontWeight: 'bold', color: '#555' }}>Description:</label>
                    <textarea
                        id="description"
                        value={book.description}
                        onChange={(e) => setBook({ ...book, description: e.target.value })}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            outline: 'none',
                            fontSize: '14px',
                            resize: 'none',
                            height: '80px',
                        }}
                    ></textarea>
                </div>
                {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    {isEditMode ? 'Update Book' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

export default BookForm;