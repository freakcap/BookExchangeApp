import React, { useEffect, useState } from 'react';
import '../styles/MainPage.css';
import apiService from '../services/apiService';

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('all');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await apiService.fetchBooks();
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  const handleCriterionChange = (e) => {
    setSearchCriterion(e.target.value);
  };

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

  const filteredBooks = searchTerm == '' ? books : books.filter((book) => {
    console.log(book);
      if(searchCriterion == "all") {
        return book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.description.toLowerCase().includes(searchTerm.toLowerCase()) ;
      } else if(searchCriterion == "owner") {
        return book.owner.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      else {
        return book[`${searchCriterion}`].toLowerCase()
      .includes(searchTerm.toLowerCase());
      }
    }
  );

  return (
    <div className="main-page">
      <h2>Available Books</h2>
      &nbsp;
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      &nbsp;
      <select
          value={searchCriterion}
          onChange={handleCriterionChange}
          className="search-criterion-dropdown"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="isin">ISIN</option>
          <option value="owner">Owner</option>
          <option value="description">Description</option>
          <option value="all">All</option>
        </select>
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
