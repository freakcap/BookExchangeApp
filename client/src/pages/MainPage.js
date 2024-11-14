import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import apiService from '../services/apiService';

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await apiService.fetchBooks();
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  const handleRequestBook = async (bookId) => {
    try {
      await apiService.requestBook(bookId);
      alert('Book requested successfully');
    } catch (error) {
      alert('Request failed');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = searchTerm == '' ? books : books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
  book.isin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-page">
      <h2>Available Books</h2>
      <button className="add-book-button" onClick={() => window.location.href = '/add-book'}>Add Book</button>
      &nbsp;
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="books-container">
        {filteredBooks && filteredBooks.length > 0 && filteredBooks.map(book => (
          <div className="book-card" key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>ISIN: {book.isin}</p>
            <p>Owner: {book.owner.name}</p>
            <p>Description: {book.description}</p>
            <button onClick={() => handleRequestBook(book._id)}>Request</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
