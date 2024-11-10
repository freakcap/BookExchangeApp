import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MainPage.css';

const MainPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('/api/books/available');
      setBooks(response.data.books);
    };
    fetchBooks();
  }, []);

  const handleRequestBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/requests/request', { bookId }, {
        headers: { Authorization: `${token}` }
      });
      alert('Book requested successfully');
    } catch (error) {
      alert('Request failed');
    }
  };

  return (
    <div className="main-page">
      <h2>Available Books</h2>
      <button className="add-book-button" onClick={() => window.location.href = '/add-book'}>Add Book</button>
      <div className="books-container">
        {books.map(book => (
          <div className="book-card" key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <button onClick={() => handleRequestBook(book._id)}>Request</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
