import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/books');
                const sortedBooks = response.data.sort((a, b) => a.id - b.id); // Sort books by ID
                setBooks(sortedBooks);
                setFilteredBooks(sortedBooks); // Initialize filteredBooks
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter books by ID
        const filtered = books.filter((book) =>
            book.id.toString().includes(query)
        );
        setFilteredBooks(filtered);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/books/${id}`);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            setFilteredBooks((prevBooks) =>
                prevBooks.filter((book) => book.id !== id)
            );
        } catch (err) {
            alert(`Failed to delete book: ${err.message}`);
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Books List</h1>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search by ID"
                    value={searchQuery}
                    onChange={handleSearch}
                    style={styles.searchBar}
                />
            </div>
            <button
                onClick={() => navigate('/add-book')}
                style={styles.addButton}
            >
                Add New Book
            </button>
            <div style={styles.bookList}>
                {filteredBooks.map((book) => (
                    <div key={book.id} style={styles.card}>
                        <div style={styles.content}>
                            <h3 style={styles.bookTitle}>{book.name}</h3>
                            <p>
                                <strong>ID:</strong> {book.id}
                            </p>
                            <p>
                                <strong>Description:</strong> {book.description}
                            </p>
                        </div>
                        <div style={styles.actions}>
                            <button
                                onClick={() => navigate(`/update-book/${book.id}`)}
                                style={styles.updateButton}
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(book.id)}
                                style={styles.deleteButton}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: '"Roboto", Arial, sans-serif',
        color: '#333',
        backgroundColor: '#f0f8ff',
        minHeight: '100vh',
    },
    header: {
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#4CAF50',
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    searchBar: {
        width: '60%',
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ddd',
        borderRadius: '5px',
        outline: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    addButton: {
        display: 'block',
        margin: '0 auto 20px auto',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s',
    },
    bookList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '300px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
    },
    content: {
        flex: '1',
    },
    bookTitle: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        color: '#4CAF50',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '15px',
    },
    updateButton: {
        padding: '8px 16px',
        backgroundColor: '#FFA500',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'background-color 0.3s',
    },
    deleteButton: {
        padding: '8px 16px',
        backgroundColor: '#FF4D4D',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'background-color 0.3s',
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.5rem',
        color: '#666',
    },
    error: {
        textAlign: 'center',
        fontSize: '1.5rem',
        color: '#FF4D4D',
    },
};

export default BooksPage;